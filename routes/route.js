const express = require("express");
const router = express.Router();
const path = require("path");
const quiz = require("../util/quiz");

router.get("/api/getquestions", (req, res, next) => {
  const category = (req.query.category || "").toLowerCase();
  const testId = (req.query.test || "").toLowerCase();
  let result = [];
  if (quiz[category] && quiz[category][testId]) {
    result = quiz[category][testId];
  }
  res.json(result);
});

router.get("/math", (req, res, next) => {
  res.render("pages/math", {
    pageTitle: "Study Helper",
    pageName: "Math Helper",
    path: "/",
  });
});
router.get("/biology", (req, res, next) => {
  res.render("pages/biology", {
    pageTitle: "Study Helper",
    pageName: "Biology Helper",
    path: "/",
  });
});
router.get("/socialstudies", (req, res, next) => {
  res.render("pages/socialstudies", {
    pageTitle: "Study Helper",
    pageName: "Social Studies Helper",
    path: "/",
  });
});
router.get("/computerscience", (req, res, next) => {
  res.render("pages/computerscience", {
    pageTitle: "Study Helper",
    pageName: "Computer Science Helper",
    path: "/",
  });
});
router.get("/question", (req, res, next) => {
  res.render("pages/question", {
    pageTitle: "Study Helper",
    pageName: "Quiz",
    path: "/",
  });
});

router.get("/", (req, res, next) => {
  res.render("pages/index", {
    pageTitle: "Study Helper",
    pageName: "Study Helper",
    path: "/",
  });
});

module.exports = router;
