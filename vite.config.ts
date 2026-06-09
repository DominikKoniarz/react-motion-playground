import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1];

// https://vite.dev/config/
export default defineConfig({
    // base:
    // process.env.GITHUB_PAGES && repoName ? `/${repoName}/` : "/",
    plugins: [
        tailwindcss(),
        react(),
        babel({ presets: [reactCompilerPreset()] }),
    ],
});
