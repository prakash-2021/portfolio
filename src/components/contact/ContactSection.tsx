"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useInView } from "motion/react";
import { site } from "@/lib/site";
import { Mascot } from "@/components/mascot/Mascot";
import { HalftoneCorner } from "@/components/comic/ComicElements";
import { cn } from "@/lib/cn";
import styles from "./ContactSection.module.scss";

const PRIORITIES = ["Low", "Medium", "High", "Urgent"];

/* ─── TAPE ────────────────────────────────────────────────── */

function Tape({ className }: { className?: string }) {
  return (
    <div className={cn(styles.tape, className)}>
      <div className={styles.tapeInner} />
    </div>
  );
}

/* ─── PAPER CLIP ──────────────────────────────────────────── */

function PaperClip({ className }: { className?: string }) {
  return (
    <svg className={cn(styles.paperClip, className)} width="12" height="28" viewBox="0 0 12 28" fill="none">
      <path d="M2 2v20a4 4 0 008 0V6a2 2 0 00-4 0v16" stroke="#1a1a2e" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.2" />
    </svg>
  );
}

/* ─── STAMP ───────────────────────────────────────────────── */

function Stamp({ text, color, className }: { text: string; color: string; className?: string }) {
  return (
    <motion.div
      className={cn(styles.stamp, className)}
      style={{ borderColor: `${color}50`, color }}
      initial={{ scale: 0, rotate: -10 }}
      animate={{ scale: 1, rotate: -3 }}
      transition={{ type: "spring", stiffness: 200, damping: 12 }}
    >
      {text}
    </motion.div>
  );
}

/* ─── SOCIAL CARD ─────────────────────────────────────────── */

const socialLinks = [
  { label: "GitHub", href: site.links.github, color: "#1a1a2e" },
  { label: "LinkedIn", href: site.links.linkedin, color: "#457b9d" },
  { label: "Email", href: `mailto:${site.email}`, color: "#e63946" },
  { label: "Resume", href: site.links.resume, color: "#f4a261" },
];

function SocialCard({ label, href, color, index }: { label: string; href: string; color: string; index: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.a
      href={href}
      target="_blank" rel="noopener noreferrer"
      className={styles.socialCard}
      style={{ "--card-color": color } as React.CSSProperties}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.6 + 0.1 * index }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.97 }}
    >
      <motion.div
        className={styles.socialCardGlow}
        animate={hovered ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3 }}
      />
      <span className={styles.socialCardLabel}>{label}</span>
      <motion.span
        className={styles.socialCardArrow}
        animate={hovered ? { x: 3, opacity: 1 } : { x: 0, opacity: 0.3 }}
        transition={{ duration: 0.2 }}
      >
        →
      </motion.span>
    </motion.a>
  );
}

/* ─── MISSION FORM ─────────────────────────────────────────── */

function MissionForm({ onStateChange }: { onStateChange: (s: "idle" | "submitting" | "done") => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [focused, setFocused] = useState<string | null>(null);
  const [state, setState] = useState<"idle" | "submitting" | "done">("idle");

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setState("submitting");
    onStateChange("submitting");
    setTimeout(() => {
      setState("done");
      onStateChange("done");
    }, 2500);
  }, [name, email, onStateChange]);

  if (state === "done") {
    return (
      <motion.div
        className={styles.doneState}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Stamp text="CONFIDENTIAL" color="#e63946" className="mb-4" />
        <motion.div
          className={styles.doneIcon}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.2 }}
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <motion.path
              d="M6 18l7 7 13-13"
              stroke="#2d9b4e"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            />
          </svg>
        </motion.div>
        <motion.h3
          className={styles.doneTitle}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          MISSION RECEIVED
        </motion.h3>
        <motion.p
          className={styles.doneText}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.8 }}
        >
          I&apos;ll get back to you soon.
        </motion.p>
        <motion.button
          className={styles.resetBtn}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1.2 }}
          onClick={() => { setName(""); setEmail(""); setDetails(""); setPriority("Medium"); setState("idle"); onStateChange("idle"); }}
        >
          Send another mission →
        </motion.button>
      </motion.div>
    );
  }

  const inputClass = (field: string) => cn(
    styles.input,
    focused === field && styles.inputFocused
  );

  return (
    <motion.form
      className={styles.form}
      onSubmit={handleSubmit}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.fieldWrap}>
        <label className={styles.label}>Agent Name</label>
        <div className={styles.inputWrap}>
          <input
            className={inputClass("name")}
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onFocus={() => setFocused("name")}
            onBlur={() => setFocused(null)}
          />
          <motion.div
            className={styles.inputLine}
            animate={focused === "name" ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <div className={styles.fieldWrap}>
        <label className={styles.label}>Mission Email</label>
        <div className={styles.inputWrap}>
          <input
            className={inputClass("email")}
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setFocused("email")}
            onBlur={() => setFocused(null)}
          />
          <motion.div
            className={styles.inputLine}
            animate={focused === "email" ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <div className={styles.fieldWrap}>
        <label className={styles.label}>Mission Details</label>
        <div className={styles.inputWrap}>
          <textarea
            className={cn(inputClass("details"), styles.textarea)}
            placeholder="Tell me about your project..."
            rows={3}
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            onFocus={() => setFocused("details")}
            onBlur={() => setFocused(null)}
          />
          <motion.div
            className={styles.inputLine}
            animate={focused === "details" ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <div className={styles.fieldWrap}>
        <label className={styles.label}>Priority</label>
        <div className={styles.priorityWrap}>
          {PRIORITIES.map((p) => (
            <button
              key={p}
              type="button"
              className={cn(styles.priorityBtn, priority === p && styles.priorityActive)}
              onClick={() => setPriority(p)}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <motion.button
        type="submit"
        className={styles.submitBtn}
        disabled={state === "submitting"}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
      >
        {state === "submitting" ? (
          <motion.span
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
          >
            TRANSMITTING...
          </motion.span>
        ) : (
          <span>TRANSMIT MESSAGE →</span>
        )}
      </motion.button>

      <motion.div
        className={styles.handwrittenNote}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        All missions are reviewed within 24 hours
      </motion.div>
    </motion.form>
  );
}

/* ─── CONTACT SECTION ─────────────────────────────────────── */

export function ContactSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const [mascotAction, setMascotAction] = useState<"wave" | "point" | "sit" | "walk">("walk");
  const [formState, setFormState] = useState<"idle" | "submitting" | "done">("idle");

  const onFormStateChange = useCallback((s: "idle" | "submitting" | "done") => {
    setFormState(s);
    if (s === "submitting") setMascotAction("sit");
    if (s === "done") {
      setMascotAction("walk");
      setTimeout(() => setMascotAction("wave"), 1500);
    }
    if (s === "idle") setMascotAction("walk");
  }, []);

  return (
    <motion.section
      ref={ref}
      className={cn("px-6 sm:px-10 py-20 sm:py-28 relative", styles.section)}
      style={{ y, opacity } as unknown as React.CSSProperties}
    >
      <div className={styles.blueprintBg} />
      <div className={styles.halftoneBg} />
      <HalftoneCorner className="top-0 right-0" />
      <HalftoneCorner className="bottom-0 left-0 rotate-180" />

      <div className={styles.issueLabel}>ISSUE #007 · FINAL FRAME</div>
      <div className={styles.coordLabel}>/// 27.71°N 85.32°E // 1440 BC</div>

      <div className="max-w-[1100px] mx-auto">
        <motion.div
          className="mb-12 sm:mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="comic-caption">/// Chapter 07 — Final Frame</span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
          {/* Left: Mascot + message */}
          <motion.div
            className="md:col-span-5 md:sticky md:top-24"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className={styles.mascotArea}>
              <Mascot
                size={48}
                action={mascotAction}
                className={styles.mascotHero}
              />
              <motion.div
                className={styles.mascotLabel}
                animate={formState === "done" ? { opacity: 1 } : { opacity: 0.4 }}
              >
                {formState === "done" ? "Mission complete!" : "Your next mission awaits"}
              </motion.div>
            </div>

            <motion.h2
              className={styles.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              THE FINAL
              <br />
              <span className="text-red">ISSUE</span>
            </motion.h2>

            <motion.p
              className={styles.subtitle}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Every great product starts with a conversation.
              <br />
              Ready to write the next chapter?
            </motion.p>

            <motion.div
              className={styles.divider}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.35 }}
            />

            <AnimatePresence>
              {formState === "done" && (
                <motion.div
                  className={styles.endingNote}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Stamp text="RECEIVED" color="#2d9b4e" />
                  <p className={styles.endingText}>
                    &ldquo;See you in the next issue.&rdquo;
                  </p>
                  <div className={styles.mascotExit}>
                    <Mascot size={20} action="walk" className="opacity-30" />
                    <span className={styles.exitLabel}>Carrying your mission...</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              className={styles.socialRow}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {socialLinks.map((l, i) => (
                <SocialCard key={l.label} {...l} index={i} />
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Mission Brief */}
          <motion.div
            className="md:col-span-7"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className={styles.missionCard}>
              <Tape className="top-0 left-[20%]" />
              <Tape className="top-0 right-[20%]" />
              <Tape className="bottom-0 left-[30%] rotate-180" />
              <PaperClip className="top-3 left-3" />

              <div className={styles.cardHeader}>
                <div>
                  <span className={styles.cardLabel}>/// MISSION BRIEF</span>
                  <h3 className={styles.cardTitle}>Operation: Collaborate</h3>
                </div>
                <Stamp text="DRAFT v2" color="#f4a261" />
              </div>

              <div className={styles.cardMeta}>
                <span>ISSUE #007</span>
                <span>STATUS: OPEN</span>
              </div>

              <MissionForm onStateChange={onFormStateChange} />

              <div className={styles.cornerFold} />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
