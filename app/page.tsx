"use client";



import { useEffect, useRef, useState } from "react";

import { motion, useReducedMotion, useScroll, useTransform, AnimatePresence } from "framer-motion";

import { ArrowDownRight, ArrowUpRight, ArrowRight, MapPin, Menu, X, Crosshair, Zap, ShieldCheck, Clock3, LocateFixed, Check, ChevronRight, MoveUpRight, Radio, Route, Compass, Plus } from "lucide-react";



const missions = [

  {

    id: "01",

    name: "CHECK PRODUCT PRICE",

    category: "SHOPPING / PRODUCT AVAILABILITY",

    title: "Is this product available?",

    body: "Want to buy a phone, appliance, dress or another product? Ask someone nearby to check whether it is available and what price the shop is showing.",

    image: "https://images.unsplash.com/photo-1604719312566-8912e9c8a213?auto=format&fit=crop&w=1200&q=85",

    tag: "SHOPPING",

  },

  {

    id: "02",

    name: "CHECK THE QUEUE",

    category: "WAITING TIME / CROWD",

    title: "Is the queue too long?",

    body: "Before leaving home, ask someone to check how long the queue is at a restaurant, service centre or another permitted location.",

    image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1200&q=85",

    tag: "QUEUE CHECK",

  },

  {

    id: "03",

    name: "CHECK A PROPERTY",

    category: "HOUSE / FLAT / RENT",

    title: "Check the place before visiting.",

    body: "Looking for a house or flat? Ask someone to check agreed details, such as the building's outside appearance and nearby surroundings, with permission.",

    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",

    tag: "PROPERTY",

  },

  {

    id: "04",

    name: "CHECK A USED CAR",

    category: "CAR / BIKE / VEHICLE",

    title: "See the vehicle before travelling.",

    body: "Found a used car or bike for sale? Ask someone to take current photos and check visible details before you travel to see it yourself.",

    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=85",

    tag: "VEHICLES",

  },

  {

    id: "05",

    name: "CHECK IF A SHOP IS OPEN",

    category: "SHOP / BUSINESS HOURS",

    title: "Is the shop open right now?",

    body: "Want to visit a shop, office or local business? Ask someone nearby to check whether it is open before you make the trip.",

    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=85",

    tag: "LOCAL SHOPS",

  },

  {

    id: "06",

    name: "BUSINESS CHECK",

    category: "BUSINESS / ON-SITE TASKS",

    title: "Need someone to check something?",

    body: "Businesses can post local tasks when they need someone to visit a location, check agreed details and share an update.",

    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=85",

    tag: "BUSINESS",

  },


  {
    id: "07",
    name: "LOCAL ERRAND",
    category: "EVERYDAY TASKS / ERRANDS",
    title: "Need a small errand handled?",
    body: "Request a permitted local errand with clear instructions, a defined budget and an agreed handover. The person nearby completes it and shares the result.",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=85",
    tag: "ERRANDS",
  },
  {
    id: "08",
    name: "PICKUP OR COLLECTION",
    category: "PERMITTED PICKUPS / COLLECTIONS",
    title: "Need something collected?",
    body: "Arrange an authorised pickup or collection where the venue, sender and recipient permit it. Add collection details and a clear handover plan.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=85",
    tag: "PICKUPS",
  },
  {
    id: "09",
    name: "ON-SITE TASK",
    category: "VENUES / LOCAL OPERATIONS",
    title: "Need help at a particular place?",
    body: "Request a permitted on-ground task such as checking a venue setup, sharing a location update or completing an agreed observation.",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=85",
    tag: "ON-SITE",
  },
];



const steps = [
  { n: "01", title: "Post your task.", text: "Describe what needs doing, share the location, instructions and reward." },
  { n: "02", title: "Someone nearby accepts.", text: "A nearby person reviews the task, reward and time required before accepting it." },
  { n: "03", title: "Get the task done.", text: "The person completes the agreed work and submits the result or requested evidence." },
  { n: "04", title: "Review and confirm.", text: "Check the submitted result and confirm completion through SPOTKARO." },
];



function CityCanvas() {

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {

    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    let frame = 0;

    let raf = 0;

    let w = 0, h = 0;

    let points: { x: number; y: number; r: number; phase: number }[] = [];

    let mouse = { x: -1000, y: -1000 };

    const resize = () => {

      const dpr = Math.min(window.devicePixelRatio || 1, 1.7);

      w = canvas.clientWidth; h = canvas.clientHeight;

      canvas.width = w * dpr; canvas.height = h * dpr;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      points = [];

      for (let y = 22; y < h; y += 36) for (let x = 18; x < w; x += 42) {

        const offset = (Math.sin(x * .013 + y * .021) * 7);

        points.push({ x: x + offset, y: y + Math.cos(x * .01) * 5, r: Math.random() * 1.5 + .3, phase: Math.random() * 6.28 });

      }

    };

    const onMove = (e: MouseEvent) => {

      const r = canvas.getBoundingClientRect(); mouse = { x: e.clientX - r.left, y: e.clientY - r.top };

    };

    const draw = () => {

      frame += .012;

      ctx.clearRect(0, 0, w, h);

      // City blocks / imperfect street grid

      for (let x = -40; x < w + 80; x += 84) {

        ctx.beginPath(); ctx.moveTo(x + Math.sin(x * .02) * 7, 0); ctx.lineTo(x + Math.sin(x * .02) * 7, h);

        ctx.strokeStyle = "rgba(255,255,255,.055)"; ctx.lineWidth = 1; ctx.stroke();

      }

      for (let y = 16; y < h; y += 62) {

        ctx.beginPath(); ctx.moveTo(0, y + Math.sin(y * .03) * 5); ctx.lineTo(w, y + Math.sin(y * .03) * 5);

        ctx.strokeStyle = "rgba(255,255,255,.045)"; ctx.stroke();

      }

      // Animated routes

      const routes = [

        [[w * .05, h * .78], [w * .24, h * .62], [w * .39, h * .7], [w * .58, h * .4], [w * .77, h * .48], [w * .95, h * .18]],

        [[w * .1, h * .18], [w * .28, h * .3], [w * .48, h * .22], [w * .66, h * .55], [w * .86, h * .68]],

        [[w * .32, h * .94], [w * .4, h * .72], [w * .6, h * .68], [w * .73, h * .3], [w * .9, h * .34]]

      ];

      routes.forEach((route, idx) => {

        ctx.beginPath();

        route.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]));

        ctx.strokeStyle = idx === 0 ? "rgba(255,88,35,.33)" : "rgba(255,255,255,.13)";

        ctx.lineWidth = idx === 0 ? 1.5 : 1;

        ctx.setLineDash(idx === 1 ? [4, 8] : []); ctx.stroke(); ctx.setLineDash([]);

        const t = (frame * (.13 + idx * .025) + idx * .29) % 1;

        const seg = t * (route.length - 1); const i = Math.min(Math.floor(seg), route.length - 2); const f = seg - i;

        const px = route[i][0] + (route[i + 1][0] - route[i][0]) * f;

        const py = route[i][1] + (route[i + 1][1] - route[i][1]) * f;

        ctx.beginPath(); ctx.arc(px, py, 3.2, 0, Math.PI * 2); ctx.fillStyle = "#ff5823"; ctx.fill();

        ctx.beginPath(); ctx.arc(px, py, 8 + Math.sin(frame * 3) * 2, 0, Math.PI * 2); ctx.strokeStyle = "rgba(255,88,35,.35)"; ctx.stroke();

      });

      points.forEach(p => {

        const d = Math.hypot(mouse.x - p.x, mouse.y - p.y);

        const near = Math.max(0, 1 - d / 115);

        const pulse = .22 + (Math.sin(frame * 1.8 + p.phase) + 1) * .12;

        ctx.beginPath(); ctx.arc(p.x, p.y, p.r + near * 2, 0, Math.PI * 2);

        ctx.fillStyle = `rgba(255,${Math.floor(100 + near * 55)},${Math.floor(55 + near * 15)},${pulse + near * .65})`; ctx.fill();

        if (near > .08) {

          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y);

          ctx.strokeStyle = `rgba(255,88,35,${near * .14})`; ctx.stroke();

        }

      });

      raf = requestAnimationFrame(draw);

    };

    resize(); draw();

    window.addEventListener("resize", resize);

    canvas.addEventListener("mousemove", onMove);

    canvas.addEventListener("mouseleave", () => { mouse = { x: -1000, y: -1000 }; });

    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); canvas.removeEventListener("mousemove", onMove); };

  }, []);

  return <canvas ref={canvasRef} className="city-canvas" aria-hidden="true" />;

}



function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {

  const reduced = useReducedMotion();

  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 38, filter: "blur(7px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true, amount: .18 }} transition={{ duration: .78, delay, ease: [.22, 1, .36, 1] }}>{children}</motion.div>;

}



export default function Home() {

  const [activeFlow, setActiveFlow] = useState<"request" | "work">("request");

  const [activeMission, setActiveMission] = useState(0);

  const [menuOpen, setMenuOpen] = useState(false);

  const [soundOn, setSoundOn] = useState(false);

  const [showAll, setShowAll] = useState(false);

  const [email, setEmail] = useState("");

  const [toast, setToast] = useState("");

  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 180]);

  const heroOpacity = useTransform(scrollYProgress, [0, .8, 1], [1, .55, 0]);

  const mission = missions[activeMission];

  const audioContextRef = useRef<AudioContext | null>(null);

  const masterGainRef = useRef<GainNode | null>(null);

  const soundNodesRef = useRef<OscillatorNode[]>([]);

  const pingTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const notify = (message: string) => {

    setToast(message);

    window.setTimeout(() => setToast(""), 3200);

  };

  const handleSignup = (e: React.FormEvent) => {

    e.preventDefault();

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { notify("Enter a valid email to join the launch list."); return; }

    try {

      const list = JSON.parse(localStorage.getItem("spotkaro-launch-list") || "[]");

      if (!list.includes(email.trim())) list.push(email.trim());

      localStorage.setItem("spotkaro-launch-list", JSON.stringify(list));

      setEmail(""); notify("You're on the local demo launch list. Connect an API to collect signups in production.");

    } catch { notify("Signup storage is unavailable in this browser."); }

  };



  useEffect(() => {

    return () => {

      if (pingTimerRef.current) {

        clearInterval(pingTimerRef.current);

      }



      soundNodesRef.current.forEach((node) => {

        try {

          node.stop();

          node.disconnect();

        } catch {

          // Node may already have stopped.

        }

      });



      const ctx = audioContextRef.current;

      if (ctx && ctx.state !== "closed") {

        void ctx.close();

      }

    };

  }, []);



  const playSignalPing = (ctx: AudioContext, master: GainNode) => {

    const osc = ctx.createOscillator();

    const gain = ctx.createGain();



    osc.type = "sine";

    osc.frequency.setValueAtTime(880, ctx.currentTime);

    osc.frequency.exponentialRampToValueAtTime(660, ctx.currentTime + 0.22);



    gain.gain.setValueAtTime(0.0001, ctx.currentTime);

    gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 0.025);

    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.45);



    osc.connect(gain);

    gain.connect(master);



    osc.start();

    osc.stop(ctx.currentTime + 0.5);

  };



  const startSound = async () => {

    const ctx = new AudioContext();

    await ctx.resume();



    const master = ctx.createGain();

    master.gain.value = 0.22;

    master.connect(ctx.destination);



    audioContextRef.current = ctx;

    masterGainRef.current = master;



    // Deep cinematic ambient drone

    const drone1 = ctx.createOscillator();

    const drone2 = ctx.createOscillator();

    const droneGain1 = ctx.createGain();

    const droneGain2 = ctx.createGain();



    drone1.type = "sine";

    drone1.frequency.value = 55;



    drone2.type = "triangle";

    drone2.frequency.value = 82.41;



    droneGain1.gain.value = 0.16;

    droneGain2.gain.value = 0.035;



    drone1.connect(droneGain1);

    drone2.connect(droneGain2);

    droneGain1.connect(master);

    droneGain2.connect(master);



    drone1.start();

    drone2.start();



    soundNodesRef.current = [drone1, drone2];



    // Gentle atmospheric tones

    const atmosphere = ctx.createOscillator();

    const atmosphereGain = ctx.createGain();

    const filter = ctx.createBiquadFilter();



    atmosphere.type = "sine";

    atmosphere.frequency.value = 174.61;



    filter.type = "lowpass";

    filter.frequency.value = 260;



    atmosphereGain.gain.value = 0.012;



    atmosphere.connect(filter);

    filter.connect(atmosphereGain);

    atmosphereGain.connect(master);

    atmosphere.start();



    soundNodesRef.current.push(atmosphere);



    // Signal ping on startup, then periodically

    playSignalPing(ctx, master);



    pingTimerRef.current = setInterval(() => {

      if (ctx.state === "running") {

        playSignalPing(ctx, master);

      }

    }, 9000);

  };



  const stopSound = () => {

    if (pingTimerRef.current) {

      clearInterval(pingTimerRef.current);

      pingTimerRef.current = null;

    }



    soundNodesRef.current.forEach((node) => {

      try {

        node.stop();

        node.disconnect();

      } catch {

        // Node may already have stopped.

      }

    });



    soundNodesRef.current = [];



    const ctx = audioContextRef.current;

    audioContextRef.current = null;

    masterGainRef.current = null;



    if (ctx && ctx.state !== "closed") {

      void ctx.close();

    }

  };



  const handleSoundToggle = async () => {

    if (soundOn) {

      stopSound();

      setSoundOn(false);

      return;

    }



    try {

      await startSound();

      setSoundOn(true);

    } catch (error) {

      console.error("Could not start cinematic audio:", error);

      stopSound();

      notify("Audio could not start. Check your browser's sound settings.");

    }

  };



  return (

    <main>

      <div className="top-progress"><motion.div style={{ scaleX: scrollYProgress, transformOrigin: "0%" }} /></div>

      <header className="nav-shell">

        <a href="#top" className="brand" aria-label="SpotKaro home"><span className="brand-pin"><MapPin size={18} fill="currentColor" /></span><span>SPOTKARO<span className="brand-dot">.</span></span></a>

        <nav className="desktop-nav">

          <a href="#signal">The signal</a><a href="#missions">Task examples</a><a href="#how">How it works</a><a href="#earn">Find work</a>

        </nav>

        <div className="nav-actions">

          <button

            type="button"

            className={`sound-toggle ${soundOn ? "is-on" : ""}`}

            onClick={handleSoundToggle}

            aria-pressed={soundOn}

            aria-label={soundOn ? "Turn cinematic sound off" : "Turn cinematic sound on"}

          >

            <span className="sound-bars">

              <i />

              <i />

              <i />

            </span>

            <span>{soundOn ? "SOUND ON" : "SOUND OFF"}</span>

          </button>

          <a href="#launch" className="nav-cta">EXPLORE TASKS <ArrowUpRight size={15} /></a>

          <button className="mobile-menu" aria-label="Toggle menu" onClick={() => setMenuOpen(v => !v)}>{menuOpen ? <X /> : <Menu />}</button>

        </div>

        <AnimatePresence>{menuOpen && <motion.nav className="mobile-nav" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}><a onClick={() => setMenuOpen(false)} href="#signal">The signal</a><a onClick={() => setMenuOpen(false)} href="#missions">Task examples</a><a onClick={() => setMenuOpen(false)} href="#how">How it works</a><a onClick={() => setMenuOpen(false)} href="#earn">Find work</a></motion.nav>}</AnimatePresence>

      </header>



      <section className="hero" id="top" ref={heroRef}>

        <div className="hero-photo" />

        <div className="hero-shade" />

        <CityCanvas />

        <motion.div className="hero-content" style={{ y: heroY, opacity: heroOpacity }}>

          <motion.div className="eyebrow hero-eyebrow" initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .15, duration: .7 }}><span className="live-dot" /> NEED SOMETHING DONE? START HERE.</motion.div>

          <h1 className="hero-title">

            <span className="line-mask">

              <motion.span

                initial={{ y: "110%" }}

                animate={{ y: 0 }}

                transition={{ delay: 0.28, duration: 1, ease: [0.16, 1, 0.3, 1] }}

              >

                NEED SOMETHING

              </motion.span>

            </span>



            <span className="line-mask">

              <motion.span

                initial={{ y: "110%" }}

                animate={{ y: 0 }}

                transition={{ delay: 0.43, duration: 1, ease: [0.16, 1, 0.3, 1] }}

              >

                DONE?

              </motion.span>

            </span>



            <span className="line-mask">

              <motion.span

                className="outline-line"

                initial={{ y: "110%" }}

                animate={{ y: 0 }}

                transition={{ delay: 0.58, duration: 1, ease: [0.16, 1, 0.3, 1] }}

              >

                WE’RE NEARBY<span className="orange-period">.</span>

              </motion.span>

            </span>

          </h1>

          <motion.p className="hero-copy" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .9, duration: .65 }}>Need something done at a particular place? Post a task on SPOTKARO. Someone nearby can accept it, complete the work and share the result with you.</motion.p>



          <motion.div

            className="launch-announcement"

            initial={{ opacity: 0, y: 16 }}

            animate={{ opacity: 1, y: 0 }}

            transition={{ delay: 1.0, duration: 0.7 }}

          >

            <span className="launch-announcement-dot" />

            <div>

              <span className="launch-announcement-label">

                MARK YOUR CALENDAR

              </span>

              <strong>SPOTKARO LAUNCHES NOVEMBER 7, 2026</strong>

              <span className="launch-announcement-sub">

                A new way to get real-world tasks done. Coming soon.

              </span>

            </div>

            <ArrowUpRight size={20} />

          </motion.div>



          <motion.div className="hero-actions" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05, duration: .65 }}>

            <a className="button button-orange" href="#flow">EXPLORE SPOTKARO <ArrowUpRight size={17} /></a>

            <a className="text-link" href="#how"><span className="play-ring"><ArrowDownRight size={16} /></span> HOW SPOTKARO WORKS</a>

          </motion.div>

        </motion.div>

        <div className="hero-index"><span>01 / 04</span><span className="index-rule" /><span>THE SIGNAL</span></div>

        <div className="hero-coordinates"><Crosshair size={13} /> 17° 26' N  /  78° 22' E <span>FIELD SYSTEM ACTIVE</span></div>

        <motion.div className="hero-scan" animate={{ y: ["-10%", "105%"] }} transition={{ duration: 5.5, repeat: Infinity, ease: "linear", repeatDelay: 1 }} />

        <motion.div className="signal-card card-a" animate={{ y: [0, -9, 0], rotate: [-2, -1, -2] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}><span className="signal-icon"><LocateFixed size={17} /></span><div><small>LIVE REQUEST</small><b>Need a local task done?</b><span className="card-status"><i /> SIGNAL SENT</span></div><span className="card-arrow"><ArrowUpRight size={16} /></span></motion.div>

        <motion.div className="signal-card card-b" animate={{ y: [0, 8, 0], rotate: [2, 1, 2] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}><span className="signal-icon signal-icon-white"><Check size={18} /></span><div><small>FIELD REPORT / DEMO</small><b>Task completed</b><span className="card-status card-status-light"><i /> EVIDENCE RECEIVED</span></div></motion.div>

        <a href="#signal" className="scroll-cue"><span className="scroll-line" /><span>SCROLL TO DISCOVER</span><ArrowDownRight size={15} /></a>

      </section>



      <section className="ticker" aria-label="SpotKaro principles"><div className="ticker-track">{Array.from({ length: 2 }).map((_, i) => <div className="ticker-set" key={i}><span>PEOPLE NEAR YOU</span><Plus /><span>REAL PLACES</span><Plus /><span>REAL UPDATES</span><Plus /><span>LESS GUESSWORK</span><Plus /><span>ON THE GROUND</span><Plus /></div>)}</div></section>



      <section className="signal-section section-pad" id="signal">

        <div className="section-topline"><span><span className="section-dot" /> WHAT SPOTKARO DOES</span><span>01 — THE SHIFT</span></div>

        <div className="signal-grid">

          <Reveal className="signal-heading"><p className="kicker">NEED IT DONE THERE? FIND SOMEONE NEARBY.</p><h2>GET REAL-WORLD<br />TASKS DONE<br /><span>WHERE THEY HAPPEN.</span></h2></Reveal>

          <Reveal className="signal-explainer" delay={.15}><p className="big-copy">Some things can only get done on the ground. SPOTKARO connects people who need a task completed at a particular place with people nearby who can do it.</p><p className="muted-copy">From local errands and permitted pickups to product checks, property visits and queue updates, post a task or find work nearby. Complete agreed instructions and share the result.</p><a className="arrow-link" href="#missions">EXPLORE TASKS <ArrowUpRight size={17} /></a></Reveal>

        </div>

        <div className="stat-band"><div className="stat-label"><Radio size={16} /> MADE FOR EVERYDAY NEEDS</div><div className="stat"><strong>01</strong><span>ACCOUNT</span></div><div className="stat"><strong>02</strong><span>WAYS TO USE SPOTKARO</span></div><div className="stat stat-note"><span>One account. Request tasks or complete tasks.</span><ArrowDownRight size={20} /></div></div>

      </section>



      <section className="flow-section" id="flow">

        <div className="flow-backdrop">YOUR MOVE</div>

        <div className="section-topline section-topline-light"><span><span className="section-dot" /> ONE APP. TWO WAYS TO USE IT.</span><span>02 — CHOOSE YOUR MOVE</span></div>

        <Reveal><h2 className="flow-title">WHAT WOULD YOU<br />LIKE TO <span>GET DONE?</span></h2><p className="flow-subtitle">Need something done at a location? Request a task. Nearby and ready to help? Find work near you.</p><p className="flow-subtitle">Browse available tasks first. Sign in with your mobile number only when you request or accept a task.</p></Reveal>

        <div className="flow-tabs" role="tablist" aria-label="Choose your SpotKaro flow">

          <button role="tab" aria-selected={activeFlow === "request"} className={activeFlow === "request" ? "active" : ""} onClick={() => setActiveFlow("request")}><span>01</span> REQUEST A TASK <ArrowUpRight size={18} /></button>

          <button role="tab" aria-selected={activeFlow === "work"} className={activeFlow === "work" ? "active" : ""} onClick={() => setActiveFlow("work")}><span>02</span> FIND WORK NEARBY <ArrowUpRight size={18} /></button>

        </div>

        <AnimatePresence mode="wait">

          <motion.div key={activeFlow} className="flow-showcase" initial={{ opacity: 0, y: 18, filter: "blur(5px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -10 }} transition={{ duration: .42 }}>

            <div className={`flow-visual ${activeFlow === "work" ? "work-visual" : ""}`}>

              <div className="visual-noise" />

              <div className="radar-ring ring-one" /><div className="radar-ring ring-two" /><div className="radar-ring ring-three" />

              <div className="map-cross cross-one" /><div className="map-cross cross-two" />

              <motion.div className="map-route" animate={{ pathLength: [0, 1] }} transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 1.2, ease: "easeInOut" }} />

              <svg className="route-svg" viewBox="0 0 600 400" preserveAspectRatio="none"><path d="M 60 300 C 145 270, 135 170, 245 205 S 375 275, 410 135 S 510 105, 545 65" fill="none" stroke="#ff5823" strokeWidth="2" strokeDasharray="5 8" className="route-dash" /><path d="M 60 300 C 145 270, 135 170, 245 205 S 375 275, 410 135 S 510 105, 545 65" fill="none" stroke="rgba(255,88,35,.13)" strokeWidth="18" /></svg>

              <motion.div className="map-pin pin-start" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 2, repeat: Infinity }}><MapPin size={20} fill="currentColor" /></motion.div>

              <motion.div className="map-pin pin-end" animate={{ y: [0, -7, 0] }} transition={{ duration: 2.4, repeat: Infinity }}><Crosshair size={22} /></motion.div>

              <div className="map-label label-start">{activeFlow === "request" ? "YOUR LOCATION" : "TASK ACCEPTED"}<span>●</span></div>

              <div className="map-label label-end">{activeFlow === "request" ? "TASK LOCATION" : "TASK IN PROGRESS"}<span>LIVE</span></div>

              <div className="map-coords">GRID / 17.3850° N — 78.4867° E</div>

              <div className="map-stamp"><span>{activeFlow === "request" ? "REQUEST MODE" : "FIELD MODE"}</span><strong>{activeFlow === "request" ? "POST A TASK" : "FIND A TASK"}</strong><small>SPOTKARO / SYSTEM 01</small></div>

            </div>

            <div className="flow-copy">

              <span className="flow-number">{activeFlow === "request" ? "01" : "02"} / YOUR MOVE</span>

              <h3>{activeFlow === "request" ? "Need someone to get it done?" : "You can help someone nearby."}</h3>

              <p>{activeFlow === "request" ? "Share the location, explain the task, add instructions and set the reward. Review the details before publishing your request." : "Browse tasks near you. Review the instructions, reward and expected time before accepting. Complete the agreed work and submit the result."}</p>

              <ul>{(activeFlow === "request" ? ["Describe the task and location", "Set the reward and requirements", "Review the completed task and evidence"] : ["Browse tasks without signing in", "Review reward and instructions", "Complete work and track payments"]).map(t => <li key={t}><Check size={15} />{t}</li>)}</ul>

              <a href="#launch" className="button button-orange">{activeFlow === "request" ? "POST A TASK" : "FIND TASKS NEAR ME"} <ArrowUpRight size={17} /></a>

              <div className="flow-footnote"><ShieldCheck size={15} /> One account. Request tasks or complete them.</div>

            </div>

          </motion.div>

        </AnimatePresence>

      </section>



      <section className="missions-section section-pad" id="missions">

        <div className="section-topline"><span><span className="section-dot" /> WHAT CAN YOU GET DONE?</span><span>03 — SEE THE SCENE</span></div>

        <Reveal className="missions-intro"><div><p className="kicker">EVERYDAY NEEDS. REAL-WORLD HELP.</p><h2>GET IT DONE<br /><span>ON THE GROUND.</span></h2></div><p className="muted-copy">Need a task completed at a place you cannot reach right now? Explore examples of real-world tasks people can request through SPOTKARO.</p></Reveal>

        <div className="mission-layout">

          <div className="mission-list" role="tablist" aria-label="Mission types">{missions.map((m, i) => <button key={m.id} role="tab" aria-selected={activeMission === i} className={`mission-row ${activeMission === i ? "selected" : ""}`} onMouseEnter={() => setActiveMission(i)} onFocus={() => setActiveMission(i)} onClick={() => setActiveMission(i)}><span className="mission-id">{m.id}</span><span className="mission-name">{m.name}<small>{m.category}</small></span><span className="mission-go"><ArrowUpRight size={18} /></span></button>)}</div>

          <div className="mission-feature" aria-live="polite">

            <AnimatePresence mode="wait"><motion.div key={mission.id} className="mission-image" style={{ backgroundImage: `linear-gradient(0deg,rgba(8,9,8,.9),transparent 60%),url(${mission.image})` }} initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.02 }} transition={{ duration: .38 }}><div className="mission-image-top"><span><span className="live-dot" /> FIELD SCENARIO / {mission.id}</span><span>{mission.tag}</span></div><div className="mission-image-bottom"><span className="mission-giant">{mission.id}</span><div><h3>{mission.title}</h3><p>{mission.body}</p></div><ArrowUpRight size={24} /></div></motion.div></AnimatePresence>

          </div>

        </div>

        <p className="legal-note"><ShieldCheck size={14} /> Tasks must follow applicable laws, venue rules and safety requirements. Do not enter private property or collect information without permission.</p>

      </section>



      <section className="how-section section-pad" id="how">

        <div className="section-topline"><span><span className="section-dot" /> HOW SPOTKARO WORKS</span><span>04 — THE MOVEMENT</span></div>

        <Reveal><h2 className="how-title">FOUR STEPS.<br /><span>GET IT DONE.</span></h2></Reveal>

        <div className="steps-grid">{steps.map((s, i) => <Reveal key={s.n} delay={i * .12} className="step-card"><div className="step-top"><span>{s.n}</span><ArrowUpRight size={17} /></div><div className={`step-glyph glyph-${i}`}><div className="glyph-core">{i === 0 ? <MapPin size={31} /> : i === 1 ? <Route size={31} /> : i === 2 ? <Check size={31} /> : <ShieldCheck size={31} />}</div><div className="glyph-orbit orbit-a" /><div className="glyph-orbit orbit-b" /></div><h3>{s.title}</h3><p>{s.text}</p><div className="step-bottom"><span>SPOTKARO / FIELD GUIDE</span><span>0{i + 1}</span></div></Reveal>)}</div>

      </section>



      <section className="earn-section" id="earn">

        <div className="earn-photo" />

        <div className="earn-overlay" />

        <div className="earn-grid">

          <Reveal className="earn-left"><p className="kicker kicker-light">WANT TO EARN BY HELPING NEARBY?</p><h2>TASKS NEAR YOU.<br />ON YOUR TIME.<br /><span>YOUR MOVE.</span></h2><div className="earn-stamp"><Compass size={24} /><span>LOCAL KNOW-HOW<br /><b>CAN HELP OTHERS.</b></span></div></Reveal>

          <Reveal className="earn-right" delay={.18}><span className="earn-index">FIELD OPPORTUNITIES / 002</span><h3>Find tasks<br />near you.</h3><p>Browse available tasks in your area, check the instructions and payment before accepting, and earn for tasks you complete as agreed. Task availability and earnings are not guaranteed.</p><div className="earn-perks"><span><MapPin size={16} /> TASKS NEAR YOU</span><span><Clock3 size={16} /> CHOOSE WHEN AVAILABLE</span><span><ShieldCheck size={16} /> CLEAR INSTRUCTIONS</span></div><a href="#launch" className="button button-orange">FIND WORK NEARBY <ArrowUpRight size={17} /></a></Reveal>

        </div>

      </section>



      <section className="launch-section" id="launch">

        <div className="launch-grid" />

        <div className="launch-orbit launch-orbit-one" /><div className="launch-orbit launch-orbit-two" />

        <Reveal className="launch-content"><span className="launch-kicker"><span className="live-dot" /> GET STARTED WITH SPOTKARO</span>



          <div className="launch-date-badge">

            <span className="live-dot" />

            LAUNCHING NOVEMBER 7, 2026

          </div>



          <h2>

            SOMETHING NEW<br />

            <span>IS ALMOST HERE.</span>

          </h2>



          <div className="launch-date-highlight">

            <span className="launch-date-live">

              <span className="launch-date-dot" />

              OFFICIAL LAUNCH DATE

            </span>



            <span className="launch-date-main">

              NOV <strong>07</strong> <span>2026</span>

            </span>



            <span className="launch-date-caption">

              SPOTKARO GOES LIVE · SAVE THE DATE

            </span>

          </div>

          <p className="launch-wait-copy">

            Be among the first to know when we launch.

            Leave your email for launch updates.

          </p>



          <form className="launch-form" onSubmit={handleSignup}><label className="sr-only" htmlFor="launch-email">Email address</label><input id="launch-email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email address" autoComplete="email" /><button type="submit" aria-label="Join launch list"><ArrowUpRight size={21} /></button></form><small className="form-note">GET SPOTKARO UPDATES · NO SPAM</small><div className="launch-alternatives"><a href="#flow">I NEED A TASK DONE <ArrowUpRight size={15} /></a><a href="#earn">I WANT TO COMPLETE TASKS <ArrowUpRight size={15} /></a></div></Reveal>

        <div className="launch-bottom"><span>SPOTKARO / REAL-WORLD TASKS. MADE SIMPLE.</span><span>ONE ACCOUNT. TWO WAYS TO USE IT.</span><a href="#top">BACK TO THE TOP ↑</a></div>

      </section>



      <footer className="footer"><a href="#top" className="brand"><span className="brand-pin"><MapPin size={18} fill="currentColor" /></span><span>SPOTKARO<span className="brand-dot">.</span></span></a><p>Get things done nearby. Find work nearby.</p><div><a href="#how">How it works</a><a href="#missions">Use cases</a><a href="#flow">Your two flows</a><a href="#launch">Launch updates</a></div><small>© {new Date().getFullYear()} SPOTKARO. A working brand concept. Final name and domain subject to clearance.</small></footer>

      <AnimatePresence>{toast && <motion.div className="toast" role="status" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}><span className="toast-dot" />{toast}</motion.div>}</AnimatePresence>

    </main>

  );

}
