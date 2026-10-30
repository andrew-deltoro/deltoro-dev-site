---
title: "PySIEM"
kicker: "A SIEM and EDR built from scratch"
summary: "A Python SIEM/EDR with a YAML detection engine, built to learn detection engineering by doing it. It ingests real Windows telemetry from a three-VM home lab and replays it in a public, read-only demo."
category: "Security"
year: "2026"
status: "Live"
role: "Design, build, detection rules, lab"
timeline: "Multi-week build, ongoing tuning"
stack:
  - "Python"
  - "Flask"
  - "SQLite"
  - "Sysmon"
  - "YAML rules"
  - "MITRE ATT&CK"
liveUrl: "https://pysiem-demo.netlify.app"
repoUrl: "https://github.com/andrew-deltoro/Home-Labs"
cover: "/images/projects/pysiem"
coverAlt: "PySIEM console showing alert counts by severity and a table of detections with MITRE-mapped rules"
featured: true
order: 1
service: "security-audit"
prove:
  - "I can build and tune detection logic, not just read a dashboard someone else configured."
  - "I understand what endpoint telemetry actually looks like when it arrives — messy, duplicated, and missing fields."
  - "I can expose a security tool publicly without exposing the environment behind it."
---

## The problem

You can read about SIEMs for a year and still not know how to tune one. The gap between "alert fired" and "this alert is worth a human's attention" is where detection engineering actually lives, and it is not something a course can hand you.

I wanted to close that gap with my own telemetry, my own rules, and my own false positives to clean up.

## What I built

PySIEM is a Python application with three parts: a collector that normalizes Windows event data, a rule engine that reads YAML detection files, and a Flask interface for triage.

- **Ingestion** for Windows Event Log and Sysmon telemetry, normalized into a consistent event schema in SQLite.
- **YAML detection rules** carrying a rule ID, severity, MITRE ATT&CK technique, and analyst notes.
- **An alert queue** with severity filters, the raw event one click away, and space for triage notes.
- **A read-only demo mode** that replays sanitized alerts from the lab instead of touching the live server.

The rules that matter most are the boring ones: failed logon bursts, encoded PowerShell, and a new service installed outside a change window. They are also the rules that generate the most noise, which is the point.

## The lab

Three VMs: a Kali attacker, a monitored Windows 10 endpoint running Sysmon, and a Linux host running the stack. I worked through a short attack chain — credential guessing, an encoded PowerShell launch, persistence via a service install — and tuned the rules against what actually showed up.

The demo you can click through contains sanitized versions of those detections. Hostnames and identifiers are changed. The raw server is not exposed.

## What I learned

Detection quality is mostly a data problem. Before a rule can be good, the event has to arrive complete, with the fields you assumed it would have. Half of this project was schema work, not detection logic.

The other half was learning to write rules for the analyst who reads them at 2 a.m. — a clear title, a severity that means something, and a note explaining why the rule exists and when it is probably wrong.

## What I would do next

Ship the rules as versioned code with tests against recorded event fixtures, so a rule change cannot silently break detection. That is the difference between a lab and something you would trust in production.
