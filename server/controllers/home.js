import UserModel from "../model/User.js";
import { google } from "googleapis";

export const Home = async (req, res) => {
  try {
    const allUsers = await UserModel.find();
    const data = allUsers.map((d) => {
      const { username, email, id } = d;
      return { username, email, id };
    });
    res.json(data).status(200);
  } catch (error) {
    res.json(error.message).status(500);
  }
};
export const Profile = async (req, res) => {
  try {
    const { id } = req.query;
    const data = await UserModel.findById(id);
    res.json(data).status(200);
  } catch (error) {
    res.json(error.message).status(500);
  }
};
export const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email } = req.body;
    const data = await UserModel.findById(id);
    data.username = username;
    data.email = email;
    let savedata = await data.save();
    res.json(savedata).status(200);
  } catch (error) {
    res.json(error.message).status(500);
  }
};
export const calendar = async (req, res) => {
  const jwtClient = new google.auth.JWT(
    process.env.GOOGLE_CLIENT_EMAIL,
    null,
    process.env.GOOGLE_PRIVATE_KEY,
    process.env.SCOPES
  );

  const calendar = google.calendar({
    version: "v3",
    project: process.env.GOOGLE_PROJECT_NUMBER,
    auth: jwtClient,
  });

  calendar.events.list(
    {
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    },
    (error, result) => {
      if (error) {
        res.send(JSON.stringify({ error: error }));
      } else {
        if (result.data.items.length) {
          res.send(JSON.stringify({ events: result.data.items }));
        } else {
          res.send(JSON.stringify({ message: "No upcoming events found." }));
        }
      }
    }
  );
};
