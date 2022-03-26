import express from "express";
import Agenda from "agenda";
import dayjs from "dayjs";

const app = express();

const agenda = new Agenda({
  db: {
    address: "mongodb://localhost:27017/agenda-test",
    collection: "agendaJobs",
  },
});

agenda.define("doSomething", (job) => {
  console.log("Job Ran");
});

app.get("/", async (req, res) => {
  const data = await agenda.schedule(
    dayjs().add(5, "seconds").format(),
    "doSomething"
  );

  res.json(data);
});

app.listen(3000, () => {
  agenda.start();
});
