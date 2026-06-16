import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import "./index.css";
import { BrowserRouter, Route, Router, Routes } from "react-router";
import { Home } from "./screen/Home";
import { VideoPage } from "./screen/videopage";
import { SignIn } from "./screen/signin";
import { Upload } from "./screen/upload";


export function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/watch" element={<VideoPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/upload" element={<Upload />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
