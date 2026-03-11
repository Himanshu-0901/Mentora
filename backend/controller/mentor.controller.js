import lesson from "../models/lession.models.js";
import session from "../models/session.models.js";

export const createLesson = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (req.user.role != "mentor") {
      return res.status(403).json({ error: "Forbidden - Access Denied" });
    }

    if (!title || !description) {
      return res
        .status(400)
        .json({ error: "Title and Description are required fields." });
    }

    const newLesson = new lesson({
      title,
      description,
      mentorId: req.user.id,
    });

    await newLesson.save();
    res.status(201).json(newLesson);
  } catch (error) {
    console.error(`Error in createLesson Controller - ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createSession = async (req, res) => {
  try {
    const { lessonId } = req.params;


    const { topic, summary } = req.body;

    if (req.user.role != "mentor") {
      return res.status(403).json({ error: "Forbidden - Access Denied" });
    }

    if (!lessonId) {
      return res.status(400).json({ error: "Lesson Id is required field." });
    }

    const findLesson = await lesson.findById(lessonId);

    if (!findLesson) {
      return res
        .status(404)
        .json({ error: "Lesson not found with the provided Id." });
    }

    if (!topic || !summary) {
      return res
        .status(400)
        .json({ error: "Topic and Summary are required fields." });
    }

    const newSession = await session.create({
      topic,
      summary,
      lessonId,
    });

    res.status(201).json(newSession);
  } catch (error) {
    console.error(`Error in createSession Controller - ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
