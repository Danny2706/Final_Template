import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./pages/Hero";
import { ThemeProvider } from "./Context/ThemeContext";
import { ConfigProvider } from "./Context/ConfigContext";
import ThemeToggle from "./Components/ToggleButton";
import Navbar from "./Components/Navbar";
import { HelmetProvider } from "react-helmet-async";
import ScrollToTop from "./Components/ScrollTop";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Portfolio from "./pages/Portfolio";
import PortfolioDetail from "./Components/PortfolioDetail";
import Blogs from "./pages/Blogs";
import BlogDetail from "./Components/BlogsDetail";
import Contact from "./pages/Contact";

function App() {
  return (
    <HelmetProvider>
      <ConfigProvider>
        <ThemeProvider>
          <Router>
            <div className="transition-colors duration-500 bg-[#01252a] text-[#f3e1c1] dark:bg-[#0A0019] dark:text-white min-h-screen">
              <ScrollToTop />
              <Navbar />
              <main className="flex-grow w-full">
                <Routes>
                  <Route path="/" element={<Hero />} />
                   <Route path="/about" element={<About/>} /> 
                   <Route path="/service" element={<Skills/>} />
                  <Route path="/portfolio" element={<Portfolio/>} />
                   <Route path="/blogs" element={<Blogs/>} />
                   <Route path="/contact" element={<Contact/>} />
                   <Route path="/blog/:id" element={<BlogDetail/>} /> 
                   <Route path="/project/:id" element={<PortfolioDetail/>} />
                </Routes>
              </main>
              <div className="fixed bottom-5 right-5">
                <ThemeToggle />
              </div>
            </div>
          </Router>
        </ThemeProvider>
      </ConfigProvider>
    </HelmetProvider>
  );
}

export default App;
