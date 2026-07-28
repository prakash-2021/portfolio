import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const PRIORITIES = ["Low", "Medium", "High", "Urgent"];

const MAX_LENGTHS = {
  name: 100,
  email: 254,
  details: 5000,
};

function sanitize(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const details = typeof body.details === "string" ? body.details.trim() : "";
    const priority = typeof body.priority === "string" ? body.priority : "";

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    if (name.length > MAX_LENGTHS.name) {
      return NextResponse.json({ error: "Name is too long" }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    if (email.length > MAX_LENGTHS.email) {
      return NextResponse.json({ error: "Email is too long" }, { status: 400 });
    }

    if (details.length > MAX_LENGTHS.details) {
      return NextResponse.json({ error: "Details are too long" }, { status: 400 });
    }

    if (!PRIORITIES.includes(priority)) {
      return NextResponse.json({ error: "Invalid priority" }, { status: 400 });
    }

    const safeName = sanitize(name);
    const safeEmail = sanitize(email);
    const safeDetails = sanitize(details);
    const safePriority = sanitize(priority);

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${safeName}" <${process.env.SMTP_USER}>`,
      replyTo: email,
      to: process.env.CONTACT_EMAIL || "prakashrestha2075@gmail.com",
      subject: `[Portfolio] Mission from ${safeName} — ${safePriority} Priority`,
      text: `Name: ${safeName}\nEmail: ${safeEmail}\nPriority: ${safePriority}\n\nMessage:\n${safeDetails}`,
      html: `
        <h2>New Mission Brief</h2>
        <table style="border-collapse:collapse;width:100%;max-width:500px">
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:700">Agent</td><td style="padding:8px;border:1px solid #ddd">${safeName}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:700">Email</td><td style="padding:8px;border:1px solid #ddd">${safeEmail}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:700">Priority</td><td style="padding:8px;border:1px solid #ddd">${safePriority}</td></tr>
        </table>
        <h3>Message</h3>
        <p style="white-space:pre-wrap">${safeDetails}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to send email:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
