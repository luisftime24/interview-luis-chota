import express from "express";
const { v4: uuidv4 } = require("uuid");

import { candidates } from "./database";
import { validateData, bestCandidate, isValidSkills } from "./helpers";

const app = express();
app.use(express.json());
const PORT = process.env.HTTP_PORT || 3000;

// Your code starts here. Placeholders for .get and .post are provided for your convenience.

app.post("/candidates", function (req, res) {
	const data = req.body;
	const errors = validateData(data);

	// If there are errors, send the errors back to the client
	if (errors.length !== 0) {
		return res.status(400).json({ errors: errors });
	}

	const { name, skills } = req.body;
	const skillsSorted = skills.map((skill: string) => skill.toLowerCase()).sort();
	const newCandidate = { id: uuidv4(), name: name, skills: skillsSorted };

	candidates.push(newCandidate);
	res.status(201).json(
		{
			message: "Candidate created successfully",
			candidate: newCandidate
		}
	);
});

app.get("/", function (req, res) {
	const { skills } = req.body;
	const errors = isValidSkills(skills);

	// If there are errors, send the errors back to the client
	if (errors.length !== 0) {
		return res.status(400).json({ errors: errors });
	}

	const candidate = bestCandidate(skills);

	// If no found candidates
	if (!candidate) {
		console.info("No candidates found");
		return res.status(204).send();
	}

	res.status(200).json(candidate);
});

app.listen(PORT).on("listening", () => {
	console.info("Listening on port", PORT);
});
