import styles from "./login.module.css";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.8 + 0.4,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.5 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(167, 139, 250, ${p.alpha})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      animationId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.particleCanvas} />;
}

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [slide, setSlide] = useState(0);

  const slides = [
    { title: "Manage Your Business", subtitle: "Track sales, inventory, and users all in one place." },
    { title: "Real-Time Insights", subtitle: "Powerful analytics for smarter decisions." },
    { title: "Secure & Reliable", subtitle: "Enterprise-grade security for your data." },
  ];

  useEffect(() => {
    setTimeout(() => setMounted(true), 50);
    const interval = setInterval(() => setSlide((s) => (s + 1) % slides.length), 4000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = async () => {
    setError("");
    if (!username || !userid || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    if (username === "admin" && userid === "admin123" && password === "password") {
      navigate("/welcomeadmin");
    } else if (username === "user" && userid === "user123" && password === "password") {
      navigate("/welcomeuser");
    } else {
      setLoading(false);
      setError("Invalid credentials. Please try again.");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className={`${styles.loginpage} ${mounted ? styles.pageVisible : ""}`}>
      {/* LEFT PANEL */}
      <div className={styles.leftPanel}>
        <ParticleCanvas />
        <div className={styles.orb1} />
        <div className={styles.orb2} />
        <div className={styles.brandLogo}>
          <span className={styles.brandIcon}>◈</span>
          <span className={styles.brandName}>NexusPos</span>
        </div>
        <div className={styles.leftContent}>
          <div className={styles.slideshow}>
            {slides.map((s, i) => (
              <div
                key={i}
                className={`${styles.slide} ${i === slide ? styles.slideActive : ""}`}
              >
                <h2 className={styles.slideTitle}>{s.title}</h2>
                <p className={styles.slideSubtitle}>{s.subtitle}</p>
              </div>
            ))}
            <div className={styles.dots}>
              {slides.map((_, i) => (
                <button
                  key={i}
                  className={`${styles.dot} ${i === slide ? styles.dotActive : ""}`}
                  onClick={() => setSlide(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className={styles.rightPanel}>
        <div className={styles.formCard}>
          <div className={styles.formHeader}>
            <h1 className={styles.formTitle}>Welcome back</h1>
            <p className={styles.formSubtitle}>Sign in to your account to continue</p>
          </div>

          {error && (
            <div className={styles.errorBanner}>
              <span className={styles.errorIcon}>⚠</span> {error}
            </div>
          )}

          <div className={styles.fields}>
            <div className={`${styles.inputGroup} ${focusedField === "username" ? styles.focused : ""}`}>
              <label className={styles.label}>Username</label>
              <div className={styles.inputWrapper}>
                <span className={styles.inputIcon}>👤</span>
                <input
                  id="username"
                  className={styles.input}
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onFocus={() => setFocusedField("username")}
                  onBlur={() => setFocusedField(null)}
                  onKeyDown={handleKeyDown}
                  autoComplete="username"
                />
              </div>
            </div>

            <div className={`${styles.inputGroup} ${focusedField === "userid" ? styles.focused : ""}`}>
              <label className={styles.label}>User ID</label>
              <div className={styles.inputWrapper}>
                <span className={styles.inputIcon}>🪪</span>
                <input
                  id="userid"
                  className={styles.input}
                  type="text"
                  placeholder="Enter your User ID"
                  value={userid}
                  onChange={(e) => setUserid(e.target.value)}
                  onFocus={() => setFocusedField("userid")}
                  onBlur={() => setFocusedField(null)}
                  onKeyDown={handleKeyDown}
                />
              </div>
            </div>

            <div className={`${styles.inputGroup} ${focusedField === "password" ? styles.focused : ""}`}>
              <label className={styles.label}>Password</label>
              <div className={styles.inputWrapper}>
                <span className={styles.inputIcon}>🔒</span>
                <input
                  id="password"
                  className={styles.input}
                  type={showPass ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  onKeyDown={handleKeyDown}
                  autoComplete="current-password"
                />
                <button
                  className={styles.eyeToggle}
                  onClick={() => setShowPass((v) => !v)}
                  tabIndex={-1}
                  type="button"
                  aria-label="Toggle password visibility"
                >
                  {showPass ? "🙈" : "👁️"}
                </button>
              </div>
            </div>
          </div>

          <button
            className={`${styles.loginBtn} ${loading ? styles.loginBtnLoading : ""}`}
            onClick={handleLogin}
            disabled={loading}
            id="login-button"
          >
            {loading ? (
              <span className={styles.spinner} />
            ) : (
              <span>Sign In</span>
            )}
          </button>

          <p className={styles.hint}>
            Demo: <strong>admin</strong> / <strong>admin123</strong> / <strong>password</strong>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;