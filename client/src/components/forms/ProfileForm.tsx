import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import { useAuth } from "../../hooks/useAuth";
import type { AuthContextType } from "../../types/user";
import axios from "../../services/axiosInstance";

interface DashboardProfileForm {
  name: string;
  title: string;
  bio: string;
  skills: string;
  location: string;
  imageUrl: string;
  github: string;
  linkedin: string;
  portfolio: string;
}

export const ProfileForm = () => {
  const { token, logout } = useAuth() as AuthContextType;
  const [form, setForm] = useState<DashboardProfileForm>({
    name: "",
    title: "",
    bio: "",
    skills: "",
    location: "",
    imageUrl: "",
    github: "",
    linkedin: "",
    portfolio: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Load existing profile (if user already created one)
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("/profile/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setForm(res.data);
      } catch {
        // no profile yet
      }
    };
    fetchProfile();
  }, [token]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/profile", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("✅ Profile saved!");
    } catch (err) {
      setMessage("❌ Error saving profile.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Freelancer Dashboard</h2>
          <button onClick={logout} className="text-sm text-red-500 underline">
            Logout
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Your Name"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
          />
          <input
            name="title"
            placeholder="Your Title (e.g. Full Stack Developer)"
            required
            value={form.title}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
          />
          {/* <textarea
            name="bio"
            placeholder="Short Bio"
            required
            value={form.bio}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
            rows={3}
          /> */}
          <input
            name="skills"
            placeholder="Skills (comma separated)"
            value={form.skills}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
          />
          <input
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
          />
          <input
            name="imageUrl"
            placeholder="Profile Image URL"
            value={form.imageUrl}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
          />
          <input
            name="github"
            placeholder="GitHub Link"
            value={form.github}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
          />
          <input
            name="linkedin"
            placeholder="LinkedIn Link"
            value={form.linkedin}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
          />
          <input
            name="portfolio"
            placeholder="Portfolio Website"
            value={form.portfolio}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 w-full"
          >
            {loading ? "Saving..." : "Save Profile"}
          </button>
          {message && <p className="text-sm text-center mt-2">{message}</p>}
        </form>
      </div>
    </div>
  );
};
