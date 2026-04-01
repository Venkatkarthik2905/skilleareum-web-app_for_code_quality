import React, { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeftLong,
  faClipboardList,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import axiosInstance from "../../../../../../config/axiosInstance";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SERVER_URL, BASE_URL, handleSpeak } from "../../../../../../config";
import AISpaceTask2Web from "./AISpaceTask2Web";
import AISpaceTaskWeb from "./AISpaceTaskWeb";
import CountdownTimerWeb from "./CountdownTimerWeb";
import DashboardLayout from "../../Layout/DashboardLayout";
import { playEveryTap } from "../../../../../../utils/audioUtils";

const AiSpaceWeb = () => {
  const { t, i18n } = useTranslation("ai_space");
  const navigate = useNavigate();
  const userId = useSelector((state) => state.user_email.id);
  const authToken = useSelector((state) => state.token);

  const sub_status = useSelector((state) => state.user_email.sub_status);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const source = queryParams.get("source");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [openapp, setOpenApp] = useState(null);
  const [mission, setmission] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [canClaim, setcanClaim] = useState(false);
  const [subscribe, setSubscribe] = useState(false);
  const [opentask, setOpenTask] = useState(false);
  const [opentask2, setOpenTask2] = useState(false);
  const [isClaimed, setIsClaimed] = useState(false);

  const [isUpdate, setIsUpdate] = useState(false);
  // const [audio] = useState(new Audio("../assets/EveryTap.mp3"));
  // const [startJoyride, setStartJoyride] = useState(false);
  const [run, setRun] = useState(false);
  const { NewUser } = location.state || { NewUser: false };
  // const NewUser  = true;

  const settings = {
    infinite: true,
    speed: 500,
    dots: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 10000,
    pauseOnHover: true,
    adaptiveHeight: true,
  };

  // useEffect(() => {
  //   audio.load();
  // }, [audio]);

  const playSound = () => {
    playEveryTap();
  };
  const handleSubscribe = () => {
    playSound();
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
      // setSubscribe(!subscribe);
    navigate("/SubPackWeb");
  };

  const [toolsData, setToolsData] = useState([
    {
    img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/editpad.png",
    title: "Edit Pad",
    link: "https://www.editpad.org/",
    category: "ai_writing",
    width: "50px",
    height: "50px",
    content:
      "Edit Pad is a simple online text editor for quick writing and editing, offering an accessible platform for note-taking, brainstorming, and drafting without the need for software installation.",
    visited: 0,
    points_earned: 0,
    tool_id: 73,
    click_time: "",
  },
  {
    img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/excel.png",
    title: "Excel",
    link: "https://www.microsoft.com/en-us/microsoft-365/excel",
    category: "ai_art",
    width: "50px",
    height: "50px",
    content:
      "Microsoft Excel is a versatile spreadsheet program that enables data analysis, visualization, and automation, widely used for both personal and professional productivity tasks.",
    visited: 0,
    points_earned: 0,
    tool_id: 74,
    click_time: "",
  },
  {
    img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/applitools.png",
    title: "AppliTools",
    link: "https://applitools.com/",
    category: "image_gen",
    width: "50px",
    height: "50px",
    content:
      "AppliTools is a visual AI testing and monitoring platform that automates UI testing and ensures pixel-perfect interfaces across devices and browsers.",
    visited: 0,
    points_earned: 0,
    tool_id: 75,
    click_time: "",
  },
  {
    img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/elevenlabs.png",
    title: "ElevenLabs",
    link: "https://elevenlabs.io/",
    category: "audio_editing",
    width: "100px",
    height: "50px",
    content:
      "ElevenLabs is a leading AI-powered voice synthesis platform that delivers lifelike, customizable speech for audiobooks, games, and other creative projects.",
    visited: 0,
    points_earned: 0,
    tool_id: 76,
    click_time: "",
  },
  {
    img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/functionize.png",
    title: "Functionze",
    link: "https://www.functionize.com/",
    category: "ai_chatbots",
    width: "50px",
    height: "50px",
    content:
      "Functionze is an AI-powered testing solution that automates functional, visual, and performance testing for web and mobile applications.",
    visited: 0,
    points_earned: 0,
    tool_id: 77,
    click_time: "",
  },
  {
    img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/grammarly.png",
    title: "Grammarly",
    link: "https://www.grammarly.com/",
    category: "text_gen",
    width: "50px",
    height: "50px",
    content:
      "Grammarly is a widely used AI writing assistant that helps improve grammar, spelling, tone, and clarity in real time, catering to both casual and professional writers.",
    visited: 0,
    points_earned: 0,
    tool_id: 78,
    click_time: "",
  },{
    img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/kapwing.png",
    title: "Kapwing",
    link: "https://www.kapwing.com/",
    category: "ai_art",
    width: "100px",
    height: "50px",
    content:
      "Kapwing is an online video and image editing platform that offers AI-powered tools for creating, resizing, and enhancing multimedia content with ease.",
    visited: 0,
    points_earned: 0,
    tool_id: 79,
    click_time: "",
  },
  {
    img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/opusclip.png",
    title: "OpusClip",
    link: "https://www.opus.pro/",
    category: "ai_art",
    width: "50px",
    height: "50px",
    content:
      "OpusClip uses AI to transform long-form videos into short, engaging clips optimized for social media platforms, boosting reach and engagement.",
    visited: 0,
    points_earned: 0,
    tool_id: 80,
    click_time: "",
  },
  {
    img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/photopea.png",
    title: "Photopea",
    link: "https://www.photopea.com/",
    category: "image_gen",
    width: "50px",
    height: "50px",
    content:
      "Photopea is a free online photo editor with advanced features similar to Photoshop, supporting PSD, AI, and other popular image formats.",
    visited: 0,
    points_earned: 0,
    tool_id: 81,
    click_time: "",
  },
  {
    img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/recraft.png",
    title: "Recraft",
    link: "https://www.recraft.ai/",
    category: "image_gen",
    width: "50px",
    height: "50px",
    content:
      "Recraft is an AI-powered design tool for generating high-quality illustrations, icons, and graphics tailored to your creative needs.",
    visited: 0,
    points_earned: 0,
    tool_id: 82,
    click_time: "",
  },
  {
    img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/alphasense.png",
    title: "Alphasense",
    link: "https://www.alpha-sense.com/",
    category: "text_gen",
    width: "100px",
    height: "50px",
    content:
      "Alphasense is an AI-driven market intelligence platform that helps businesses analyze data, discover insights, and make informed decisions.",
    visited: 0,
    points_earned: 0,
    tool_id: 83,
    click_time: "",
  },
  {
    img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/beepbox.png",
    title: "BeepBox",
    link: "https://www.beepbox.co/",
    category: "audio_editing",
    width: "100px",
    height: "50px",
    content:
      "BeepBox is an easy-to-use online music creation tool that lets users compose and share chiptune-style melodies directly from their browser.",
    visited: 0,
    points_earned: 0,
    tool_id: 84,
    click_time: "",
  }, {
    img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/chatgpt.png",
    title: "ChatGPT",
    link: "https://chat.openai.com/",
    category: "ai_chatbots",
    width: "50px",
    height: "50px",
    content:
      "ChatGPT is an advanced AI chatbot by OpenAI that can answer questions, generate content, and assist with tasks using natural language understanding.",
    visited: 0,
    points_earned: 0,
    tool_id: 85,
    click_time: "",
  },
  {
    img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/claude.png",
    title: "Claude",
    link: "https://claude.ai/",
    category: "ai_chatbots",
    width: "50px",
    height: "50px",
    content:
      "Claude is an AI assistant by Anthropic designed for thoughtful conversation, creative writing, and problem-solving, with a focus on safety and reliability.",
    visited: 0,
    points_earned: 0,
    tool_id: 86,
    click_time: "",
  },
  {
    img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/compass.png",
    title: "Compass",
    link: "https://www.atlassian.com/software/confluence/compass",
    category: "ai_writing",
    width: "50px",
    height: "50px",
    content:
      "Compass is an Atlassian tool that provides insights, documentation, and team coordination for software projects, enhancing productivity and collaboration.",
    visited: 0,
    points_earned: 0,
    tool_id: 87,
    click_time: "",
  },
  {
    img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/dalle.png",
    title: "Dall-E 3",
    link: "https://openai.com/dall-e-3",
    category: "image_gen",
    width: "50px",
    height: "50px",
    content:
      "DALL·E 3 is OpenAI’s advanced image generation model, capable of producing detailed, high-quality visuals from natural language prompts.",
    visited: 0,
    points_earned: 0,
    tool_id: 88,
    click_time: "",
  },
  {
    img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/deepseek.png",
    title: "DeepSeek",
    link: "https://www.deepseek.com/",
    category: "text_gen",
    width: "50px",
    height: "50px",
    content:
      "DeepSeek is an AI-powered search and research platform that analyzes large datasets to extract precise, actionable insights.",
    visited: 0,
    points_earned: 0,
    tool_id: 89,
    click_time: "",
  },
  {
    img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/descript.png",
    title: "Descript",
    link: "https://www.descript.com/",
    category: "audio_editing",
    width: "50px",
    height: "50px",
    content:
      "Descript is an all-in-one audio and video editing platform with AI tools for transcription, overdubbing, and easy drag-and-drop editing.",
    visited: 0,
    points_earned: 0,
    tool_id: 90,
    click_time: "",
  },
  {
    img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/firefly.png",
    title: "Firefly",
    link: "https://www.adobe.com/sensei/generative-ai/firefly.html",
    category: "image_gen",
    width: "50px",
    height: "50px",
    content:
      "Adobe Firefly is a generative AI tool that creates stunning images, text effects, and designs tailored for creative professionals.",
    visited: 0,
    points_earned: 0,
    tool_id: 91,
    click_time: "",
  },
  {
    img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/flexclip.png",
    title: "FlexClip",
    link: "https://www.flexclip.com/",
    category: "ai_art",
    width: "50px",
    height: "50px",
    content:
      "FlexClip is an online video maker and editor with AI-powered templates, animations, and effects for creating professional-quality videos effortlessly.",
    visited: 0,
    points_earned: 0,
    tool_id: 92,
    click_time: "",
  },
  {
    img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/fraseio.png",
    title: "Frase IO",
    link: "https://www.frase.io/",
    category: "ai_writing",
    width: "50px",
    height: "50px",
    content:
      "Frase IO is an AI writing and SEO optimization platform that helps create, research, and optimize content for better search rankings.",
    visited: 0,
    points_earned: 0,
    tool_id: 93,
    click_time: "",
  },
  {
    img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/gemini.png",
    title: "Gemini",
    link: "https://deepmind.google/technologies/gemini/",
    category: "ai_chatbots",
    width: "50px",
    height: "50px",
    content:
      "Gemini is Google DeepMind's multimodal AI model, designed to handle text, image, and code tasks with high accuracy and efficiency.",
    visited: 0,
    points_earned: 0,
    tool_id: 94,
    click_time: "",
  },
  {
    img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/githubcopilot.png",
    title: "GitHub Copilot",
    link: "https://github.com/features/copilot",
    category: "ai_writing",
    width: "50px",
    height: "50px",
    content:
      "GitHub Copilot is an AI coding assistant powered by OpenAI, providing real-time code suggestions and accelerating software development.",
    visited: 0,
    points_earned: 0,
    tool_id: 95,
    click_time: "",
  },
  {
    img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/gretel.png",
    title: "Gretel",
    link: "https://gretel.ai/",
    category: "text_gen",
    width: "50px",
    height: "50px",
    content:
      "Gretel offers AI-powered synthetic data generation and anonymization tools for creating privacy-preserving datasets.",
    visited: 0,
    points_earned: 0,
    tool_id: 96,
    click_time: "",
  },
  {
    img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/grok.png",
    title: "Grok",
    link: "https://x.ai/",
    category: "ai_chatbots",
    width: "50px",
    height: "50px",
    content:
      "Grok is an AI chatbot developed by xAI, designed for humor-infused, insightful, and context-aware interactions on X (formerly Twitter).",
    visited: 0,
    points_earned: 0,
    tool_id: 97,
    click_time: "",
  },
  {
    img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/gumloop.png",
    title: "Gumloop",
    link: "https://www.gumloop.com/",
    category: "ai_writing",
    width: "50px",
    height: "50px",
    content:
      "Gumloop is a no-code AI workflow automation tool that connects various apps and AI models to streamline tasks effortlessly.",
    visited: 0,
    points_earned: 0,
    tool_id: 98,
    click_time: "",
  },
  {
    img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/ibmwatson.png",
    title: "IBM Watson",
    link: "https://www.ibm.com/watson",
    category: "ai_chatbots",
    width: "50px",
    height: "50px",
    content:
      "IBM Watson is a suite of enterprise-ready AI services, applications, and tools for building intelligent workflows and solutions.",
    visited: 0,
    points_earned: 0,
    tool_id: 99,
    click_time: "",
  },
  {
    img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/jasper.png",
    title: "Jasper",
    link: "https://www.jasper.ai/",
    category: "ai_writing",
    width: "50px",
    height: "50px",
    content:
      "Jasper is an AI writing assistant that creates engaging marketing copy, blogs, and social content tailored to your brand voice.",
    visited: 0,
    points_earned: 0,
    tool_id: 100,
    click_time: "",
  },
  {
    img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/midjourney.png",
    title: "Midjourney",
    link: "https://www.midjourney.com/",
    category: "image_gen",
    width: "100px",
    height: "50px",
    content:
      "Midjourney is an AI image generation tool that transforms text prompts into highly artistic and detailed visuals.",
    visited: 0,
    points_earned: 0,
    tool_id: 101,
    click_time: "",
  },
  {
    img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/n8n.png",
    title: "N8n",
    link: "https://n8n.io/",
    category: "ai_writing",
    width: "100px",
    height: "50px",
    content:
      "N8n is an open-source workflow automation tool that integrates APIs and services, enabling complex workflows with minimal coding.",
    visited: 0,
    points_earned: 0,
    tool_id: 102,
    click_time: "",
  },
  {
    img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/notionai.png",
    title: "Notion AI",
    link: "https://www.notion.so/product/ai",
    category: "ai_writing",
    width: "50px",
    height: "50px",
    content:
      "Notion AI enhances the Notion workspace with AI features for writing, summarizing, brainstorming, and managing information efficiently.",
    visited: 0,
    points_earned: 0,
    tool_id: 103,
    click_time: "",
  },
  {
    img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/pathai.png",
    title: "Path AI",
    link: "https://pathai.com/",
    category: "ai_chatbots",
    width: "100px",
    height: "50px",
    content:
      "Path AI develops AI-powered pathology tools to assist doctors in diagnosing diseases more accurately and efficiently.",
    visited: 0,
    points_earned: 0,
    tool_id: 104,
    click_time: "",
  },
  {
    img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/perplexity.png",
    title: "Perplexity AI",
    link: "https://www.perplexity.ai/",
    category: "ai_chatbots",
    width: "50px",
    height: "50px",
    content:
      "Perplexity AI is a conversational search engine that uses AI to provide direct, cited, and context-aware answers to questions.",
    visited: 0,
    points_earned: 0,
    tool_id: 105,
    click_time: "",
  },
  {
    img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/pinetools.png",
    title: "Pinetools",
    link: "https://pinetools.com/",
    category: "image_gen",
    width: "50px",
    height: "50px",
    content:
      "Pinetools offers a variety of simple online tools for editing images, texts, and numbers directly from the browser.",
    visited: 0,
    points_earned: 0,
    tool_id: 106,
    click_time: "",
  },
  {
    img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/pixlr.png",
    title: "Pixlr",
    link: "https://pixlr.com/",
    category: "image_gen",
    width: "50px",
    height: "50px",
    content:
      "Pixlr is a free online photo editor with AI-assisted tools for quick and professional image editing.",
    visited: 0,
    points_earned: 0,
    tool_id: 107,
    click_time: "",
  },
  {
    img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/resoomer.png",
    title: "Resoomer",
    link: "https://resoomer.com/",
    category: "text_gen",
    width: "50px",
    height: "50px",
    content:
      "Resoomer is an AI summarization tool that condenses long texts into clear, concise summaries for faster understanding.",
    visited: 0,
    points_earned: 0,
    tool_id: 108,
    click_time: "",
  },
  {
    img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/runwayml.png",
    title: "Runway ML",
    link: "https://runwayml.com/",
    category: "ai_art",
    width: "50px",
    height: "50px",
    content:
      "Runway ML is an AI creative suite offering tools for video editing, image generation, and other multimedia projects.",
    visited: 0,
    points_earned: 0,
    tool_id: 109,
    click_time: "",
  },
  {
    img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/slickwrite.png",
    title: "Slick Write",
    link: "https://www.slickwrite.com/",
    category: "ai_writing",
    width: "100px",
    height: "50px",
    content:
      "Slick Write is an online grammar and style checker that helps improve clarity, structure, and readability of writing.",
    visited: 0,
    points_earned: 0,
    tool_id: 110,
    click_time: "",
  },
  {
    img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/smodin.png",
    title: "Smodin",
    link: "https://smodin.io/",
    category: "text_gen",
    width: "50px",
    height: "50px",
    content:
      "Smodin is an AI-powered writing platform offering tools for paraphrasing, summarizing, and multilingual content generation.",
    visited: 0,
    points_earned: 0,
    tool_id: 111,
    click_time: "",
  },
  {
    img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/stablediffusion.png",
    title: "Stable Diffusion",
    link: "https://stability.ai/stable-diffusion",
    category: "image_gen",
    width: "50px",
    height: "50px",
    content:
      "Stable Diffusion is an open-source AI model that generates high-quality images from natural language prompts.",
    visited: 0,
    points_earned: 0,
    tool_id: 112,
    click_time: "",
  },
  {
    img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/synthesia.png",
    title: "Synthesia",
    link: "https://www.synthesia.io/",
    category: "ai_art",
    width: "50px",
    height: "50px",
    content:
      "Synthesia is an AI video creation platform that generates talking avatars for training, marketing, and presentations.",
    visited: 0,
    points_earned: 0,
    tool_id: 113,
    click_time: "",
  },
  {
    img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/tableau.png",
    title: "Tableau",
    link: "https://www.tableau.com/",
    category: "ai_art",
    width: "50px",
    height: "50px",
    content:
      "Tableau is a leading data visualization platform that helps create interactive and shareable dashboards from various data sources.",
    visited: 0,
    points_earned: 0,
    tool_id: 114,
    click_time: "",
  },
  {
    img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/testim.png",
    title: "Testim",
    link: "https://www.testim.io/",
    category: "ai_chatbots",
    width: "100px",
    height: "50px",
    content:
      "Testim uses AI to accelerate software testing by automating test creation, execution, and maintenance.",
    visited: 0,
    points_earned: 0,
    tool_id: 115,
    click_time: "",
  },
  {
    img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/textfx.png",
    title: "Textfx",
    link: "https://textfx.withgoogle.com/",
    category: "ai_writing",
    width: "100px",
    height: "50px",
    content:
      "Textfx is an AI tool from Google designed for experimenting with language, offering creative text transformations and generation.",
    visited: 0,
    points_earned: 0,
    tool_id: 116,
    click_time: "",
  },
  {
    img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/tome.png",
    title: "Tome",
    link: "https://beta.tome.app/",
    category: "ai_writing",
    width: "50px",
    height: "50px",
    content:
      "Tome is an AI storytelling tool that helps create visually engaging presentations and documents quickly.",
    visited: 0,
    points_earned: 0,
    tool_id: 117,
    click_time: "",
  },
  {
    img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/uipath.png",
    title: "UI Path",
    link: "https://www.uipath.com/",
    category: "ai_writing",
    width: "50px",
    height: "50px",
    content:
      "UiPath is a leading robotic process automation (RPA) platform that uses AI to automate repetitive business tasks.",
    visited: 0,
    points_earned: 0,
    tool_id: 118,
    click_time: "",
  },
  {
    img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/youdotcom.png",
    title: "You.com",
    link: "https://you.com/",
    category: "ai_chatbots",
    width: "100px",
    height: "50px",
    content:
      "You.com is an AI-powered search engine that answers queries directly, integrates chat, and provides summarized results.",
    visited: 0,
    points_earned: 0,
    tool_id: 119,
    click_time: "",
  },
  {
    img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/zapieragents.png",
    title: "Zapier Agents",
    link: "https://zapier.com/agents",
    category: "ai_writing",
    width: "50px",
    height: "50px",
    content:
      "Zapier Agents lets you create AI-powered automation bots that interact with apps, APIs, and workflows seamlessly.",
    visited: 0,
    points_earned: 0,
    tool_id: 120,
    click_time: "",
  },

  ]);

  const filteredApps = toolsData.filter((app, index, self) => {
    const trimmedCategory = app.category.trim();
    const trimmedSelectedCategory = selectedCategory.trim();
    if (trimmedSelectedCategory === "All") {
      return self.findIndex((t) => t.title === app.title) === index;
    }
    if (trimmedSelectedCategory === "Text Generation and Summarization") {
      return trimmedCategory === "Text Generation and Summarization";
    } else if (trimmedSelectedCategory === "Image Generation and Editing") {
      return trimmedCategory === "Image Generation and Editing";
    } else if (trimmedSelectedCategory === "Audio Editing") {
      return trimmedCategory === "Audio Editing";
    } else if (trimmedSelectedCategory === "AI Art and Graphics") {
      return trimmedCategory === "AI Art and Graphics";
    } else if (trimmedSelectedCategory === "AI Chatbots") {
      return trimmedCategory === "AI Chatbots";
    } else if (trimmedSelectedCategory === "AI Writing Assistants") {
      return trimmedCategory === "AI Writing Assistants";
    } else if (trimmedSelectedCategory === "Voice to Text") {
      return trimmedCategory === "Voice to Text";
    } else if (trimmedSelectedCategory === "Video Editing and Creation") {
      return trimmedCategory === "Video Editing and Creation";
    }

    return false;
  });

  const handleapp = (item) => {
    // playSound();
    setSelectedItem(item);
    setOpenApp(!openapp);
  };
  const handleCardClick = async (cardId) => {
    // playSound();

    try {
      const response = await axiosInstance.post(
        `/api/aispace/card-click?userId=${userId}&cardId=${cardId}`,
        { params: { userId, cardId } }
      );
      const { rewardDetails } = response.data;

      setTimeout(() => {
        fetchData();
        handleapp();
      }, 1000);
      // Update the upgradedata array based on fetched reward details
      const updatedData = toolsData.map((tool) => {
        const matchingReward = rewardDetails.find(
          (reward) => reward.tool_id === tool.tool_id
        );
        if (matchingReward) {
          return {
            ...tool,
            visited: matchingReward.visited, // Update visited count
            points_earned: matchingReward.points_earned, // Update points earned
          };
        }
        return tool; // Return original tool if no match found
      });
      setToolsData(updatedData); // Update state with the new data
    } catch (error) {
      console.error("Error fetching reward details: ", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(`/api/aispace`, {
        params: { userId },
      });
      const { rewardDetails } = response.data;

      // Update the upgradedata array based on fetched reward details
      const updatedData = toolsData.map((tool) => {
        const matchingReward = rewardDetails.find(
          (reward) => reward.tool_id === tool.tool_id
        );
        if (matchingReward) {
          return {
            ...tool,
            isFirstClick: matchingReward.isFirstClick,
            visited: matchingReward.visited, // Update visited count
            points_earned: matchingReward.points_earned || "0",
            click_time: matchingReward.click_time || "", // Update points earned
          };
        }
        return tool; // Return original tool if no match found
      });

      setToolsData(updatedData); // Update state with the new data
    } catch (error) {
      console.error("Error fetching reward details: ", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchMision();
  }, [isUpdate]);

  const handleStart = async () => {
    try {
      if (isClaimed) return;

      setOpenTask(!opentask);
      setIsClaimed(true);
      window.open(mission?.tool_link, "_blank");

      setIsUpdate(!isUpdate);
    } catch (error) {
      console.error("Failed to start mission:", error);
    }
  };
  const claimReward = async () => {
    try {
      if (!mission || !isClaimed) return;

      const response = await axiosInstance.post(
        `/api/aispace/mission`,
        {
          userId,
          day: mission?.day,
          language: i18n.language || "en",
        }
      );

     // console.log(response);
      toast.success(t("ui.task_completed"));
      const timeout = setTimeout(() => {
       if(source==="TaskListWeb"){
            navigate("/TaskListWeb")
          }else
          navigate("/ChallengeMapWeb");
        
      }, 2000);

      setIsUpdate(!isUpdate);
    } catch (error) {
      console.error("Failed to start mission:", error);
    }
  };

  const handleClose = () => {
  //  console.log("handleClose : ", source);
    if(source==="TaskListWeb"){
            navigate("/TaskListWeb")
          } else {
      navigate("/ChallengeMapweb");
    }
  };

  const fetchMision = async () => {
    try {
      const language = i18n.language || "en";
      const response = await axiosInstance.get(
        `/api/aispace/getAiMission?userId=${userId}&language=${language}`
      );
   //   console.log(response);
      const { mission } = response.data;
      setmission(mission);
      setOpenTask(response.data.isClaimed ? false : true);
      setcanClaim(response.data.isClaimed);
    } catch (e) {
    //  console.log(e);
    }
  };

  const [steps] = useState([
    {
      target: ".aispace",
      content: (
        <span>
          {t("ui.mission_joyride")}
        </span>
      ),
      disableBeacon: true,
    },
  ]);

  // useEffect(() => {
  //   if (NewUser) {
  //     setStartJoyride(true);
  //   }
  // }, []);

  // const handleJoyrideCallback = (data) => {
  //   const { action, index, type } = data;
  //   if (type === "tour:end") {
  //     setRun(false);
  //   }
  // };

  const handletask2 = () => {
    setOpenTask2(true);
  };

  return (
    <DashboardLayout>
    <div>
    <div className="relative text-white font-poppins mt-28 ">
      
          {/* {startJoyride && (
            <Joyride
              steps={steps}
              run={true}
              continuous={true}
              scrollToFirstStep={true}
              showProgress={true}
              showSkipButton={true}
              hideBackButton={false}
              callback={handleJoyrideCallback}
              styles={{
                options: {
                  zIndex: 1000,
                  arrowColor: "#0c1f4b",
                  background: "linear-gradient(135deg, #0285FF, #1AE348)",
                  overlayColor: "rgba(12, 31, 75, 0.6)",
                  primaryColor: "#00fff7",
                  textColor: "#ffffff",
                  width: 350,
                  borderRadius: "10px",
                  fontSize: "14px",
                },
                tooltip: {
                  background: "linear-gradient(135deg, #0285FF, #1AE348)",
                  boxShadow: "0 0 15px rgba(0, 255, 247, 0.7)",
                },
                buttonNext: {
                  backgroundColor: "#FFFFFF",
                  color: "#000",
                  borderRadius: "5px",
                  border: "0px",
                  fontWeight: "bold",
                },
                buttonBack: {
                  color: "#fff",
                },
                buttonSkip: {
                  color: "#ff007f",
                  fontWeight: "bold",
                },
                spotlight: {
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                  borderRadius: "15px",
                },
              }}
            />
          )} */}
          {showConfetti && (
            <div>
              <div className="fixed inset-0 z-50 w-full">
                <img
                  src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/Confeti.gif"
                  alt="coin shower"
                  className="h-screen w-full max-w-4xl mx-auto object-cover  "
                />
              </div>
            </div>
          )}
         
            <div className="w-full z-10 ">
              <div className="w-[75%] mx-auto z-30  ">
                <div className="w-full relative">
                  <div>
                    <button
                      className=" text-white text-xl absolute top-0 left-1 "
                      // onClick={() =>{ source==="ChallengeMap" ? navigate("/ChallengeMap") : navigate("/Farming/play")}}
                      onClick={() => {
                        handleClose();
                      }}
                    >
                      <FontAwesomeIcon icon={faArrowLeftLong} />
                    </button>
                  </div>
                 
                 
                </div>
                <div
                  onClick={() => {
                    playSound();
                    setOpenTask(true);
                  }}
                  className=" flex justify-end items-center gap-2 cursor-pointer  "
                >
                  <p className=" uppercase text-xs bg-clip-text text-transparent bg-gradient-to-r from-[#0285FF] to-[#1EEF32] font-semibold ">
                    {t("ui.todays_mission")}
                  </p>
                  <div>
                    <svg
                      width="21"
                      height="23"
                      viewBox="0 0 21 23"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.44444 19C5.04722 19 4.70718 18.8531 4.42431 18.5594C4.14144 18.2656 4 17.9125 4 17.5V7C4 6.5875 4.14144 6.23438 4.42431 5.94063C4.70718 5.64688 5.04722 5.5 5.44444 5.5H8.47778C8.63426 5.05 8.89607 4.6875 9.26319 4.4125C9.63032 4.1375 10.0426 4 10.5 4C10.9574 4 11.3697 4.1375 11.7368 4.4125C12.1039 4.6875 12.3657 5.05 12.5222 5.5H15.5556C15.9528 5.5 16.2928 5.64688 16.5757 5.94063C16.8586 6.23438 17 6.5875 17 7V17.5C17 17.9125 16.8586 18.2656 16.5757 18.5594C16.2928 18.8531 15.9528 19 15.5556 19H5.44444ZM5.44444 17.5H15.5556V7H5.44444V17.5ZM6.88889 16H11.9444V14.5H6.88889V16ZM6.88889 13H14.1111V11.5H6.88889V13ZM6.88889 10H14.1111V8.5H6.88889V10ZM10.5 6.4375C10.6565 6.4375 10.7859 6.38438 10.8882 6.27813C10.9905 6.17188 11.0417 6.0375 11.0417 5.875C11.0417 5.7125 10.9905 5.57813 10.8882 5.47188C10.7859 5.36563 10.6565 5.3125 10.5 5.3125C10.3435 5.3125 10.2141 5.36563 10.1118 5.47188C10.0095 5.57813 9.95833 5.7125 9.95833 5.875C9.95833 6.0375 10.0095 6.17188 10.1118 6.27813C10.2141 6.38438 10.3435 6.4375 10.5 6.4375Z"
                        fill="url(#paint0_linear_2220_1426)"
                      />
                      <g filter="url(#filter0_f_2220_1426)">
                        <path
                          d="M5.44444 19C5.04722 19 4.70718 18.8531 4.42431 18.5594C4.14144 18.2656 4 17.9125 4 17.5V7C4 6.5875 4.14144 6.23438 4.42431 5.94063C4.70718 5.64688 5.04722 5.5 5.44444 5.5H8.47778C8.63426 5.05 8.89607 4.6875 9.26319 4.4125C9.63032 4.1375 10.0426 4 10.5 4C10.9574 4 11.3697 4.1375 11.7368 4.4125C12.1039 4.6875 12.3657 5.05 12.5222 5.5H15.5556C15.9528 5.5 16.2928 5.64688 16.5757 5.94063C16.8586 6.23438 17 6.5875 17 7V17.5C17 17.9125 16.8586 18.2656 16.5757 18.5594C16.2928 18.8531 15.9528 19 15.5556 19H5.44444ZM5.44444 17.5H15.5556V7H5.44444V17.5ZM6.88889 16H11.9444V14.5H6.88889V16ZM6.88889 13H14.1111V11.5H6.88889V13ZM6.88889 10H14.1111V8.5H6.88889V10ZM10.5 6.4375C10.6565 6.4375 10.7859 6.38438 10.8882 6.27813C10.9905 6.17188 11.0417 6.0375 11.0417 5.875C11.0417 5.7125 10.9905 5.57813 10.8882 5.47188C10.7859 5.36563 10.6565 5.3125 10.5 5.3125C10.3435 5.3125 10.2141 5.36563 10.1118 5.47188C10.0095 5.57813 9.95833 5.7125 9.95833 5.875C9.95833 6.0375 10.0095 6.17188 10.1118 6.27813C10.2141 6.38438 10.3435 6.4375 10.5 6.4375Z"
                          fill="url(#paint1_linear_2220_1426)"
                        />
                      </g>
                      <defs>
                        <filter
                          id="filter0_f_2220_1426"
                          x="0"
                          y="0"
                          width="21"
                          height="23"
                          filterUnits="userSpaceOnUse"
                          color-interpolation-filters="sRGB"
                        >
                          <feFlood
                            flood-opacity="0"
                            result="BackgroundImageFix"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="BackgroundImageFix"
                            result="shape"
                          />
                          <feGaussianBlur
                            stdDeviation="2"
                            result="effect1_foregroundBlur_2220_1426"
                          />
                        </filter>
                        <linearGradient
                          id="paint0_linear_2220_1426"
                          x1="10.5"
                          y1="4"
                          x2="10.5"
                          y2="19"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#0285FF" />
                          <stop offset="1" stop-color="#1EEF32" />
                        </linearGradient>
                        <linearGradient
                          id="paint1_linear_2220_1426"
                          x1="10.5"
                          y1="4"
                          x2="10.5"
                          y2="19"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#0285FF" />
                          <stop offset="1" stop-color="#1EEF32" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
                {/* <div className="w-[100%] mt-7 mx-auto font-zendots text-sm ">
                                                <div className="w-[100%] mx-auto mt-5 px-2 custom-slider">
                        <Slider {...settings} className=" ">
                          {[
                  
                            { name: "AI Space", path: "/Aispace", action: goToPageOne },
                            { name: "AI Games", path: "/Farming/Play", action: goToPageTwo },
                            { name: "AI Fact Vault", path: "/Aivault", action: goToPageThree },
                            { name: "AI Learning", path: "/Learning", action: goToPageFour },
                            { name: "AI Blog", path: "/Aiblog", action: goToPageFive },
                  
                          ].map(({ name, path, action }) => (
                           <div className=" py-3 px-1 ">
                            <button
                              key={name}
                              onClick={action}
                              className={`w-full py-1 rounded-lg px-2 shrink-0 transition-all duration-300 ${
                                location.pathname === path
                                  ? "bg-gradient-to-l from-[#1EEF32]/85 to-[#303E8A]/85 to-40% text-white font-semibold border border-[#1AE348]/60"
                                  : "bg-gradient-to-l from-[#1EEF32]/20 from-5% to-[#303E8A]/20 to-54% text-white/60"
                              } text-xs focus:outline-none`}
                            >
                              {name}
                            </button>
                            </div>
                          ))}
                        </Slider>
                      </div>
                            </div> */}
                <div className="w-[100%] mx-auto flex items-center gap-2 mt-5 overflow-hidden overflow-x-auto ">
                  <button
                    className={`py-1 px-2 text-xs  rounded-lg text-white whitespace-nowrap ${
                      selectedCategory === "All"
                        ? "bg-gradient-to-l from-[#1EEF32]/85 to-[#303E8A]/85 text-white font-bold"
                        : "bg-gradient-to-l from-[#1EEF32]/20 from-5% to-[#303E8A]/20 to-54%  font-light"
                    }`}
                    onClick={() => {
                      playSound();
                      setSelectedCategory("All");
                    }}
                  >
                    {t("categories.all")}
                  </button>
                  <button
                    className={`py-1 px-2 text-xs  rounded-lg text-white whitespace-nowrap ${
                      selectedCategory === "text_gen"
                        ? "bg-gradient-to-l from-[#1EEF32]/85 to-[#303E8A]/85 text-white font-bold"
                        : "bg-gradient-to-l from-[#1EEF32]/20 from-5% to-[#303E8A]/20 to-54%  font-light"
                    }`}
                    onClick={() => {
                      playSound();
                      setSelectedCategory("text_gen");
                    }}
                  >
                    {t("categories.text_gen")}
                  </button>
                  <button
                    className={`py-1 px-2 text-xs  rounded-lg text-white whitespace-nowrap ${
                      selectedCategory === "image_gen"
                        ? "bg-gradient-to-l from-[#1EEF32]/85 to-[#303E8A]/85 text-white font-bold"
                        : "bg-gradient-to-l from-[#1EEF32]/20 from-5% to-[#303E8A]/20 to-54%  font-light"
                    }`}
                    onClick={() => {
                      playSound();
                      setSelectedCategory("image_gen");
                    }}
                  >
                    {t("categories.image_gen")}
                  </button>
                  <button
                    className={`py-1 px-2 text-xs  rounded-lg text-white whitespace-nowrap ${
                      selectedCategory === "audio_editing"
                        ? "bg-gradient-to-l from-[#1EEF32]/85 to-[#303E8A]/85 text-white font-bold"
                        : "bg-gradient-to-l from-[#1EEF32]/20 from-5% to-[#303E8A]/20 to-54%  font-light"
                    }`}
                    onClick={() => {
                      playSound();
                      setSelectedCategory("audio_editing");
                    }}
                  >
                    {t("categories.audio_editing")}
                  </button>
                  <button
                    className={`py-1 px-2 text-xs  rounded-lg text-white whitespace-nowrap ${
                      selectedCategory === "ai_art"
                        ? "bg-gradient-to-l from-[#1EEF32]/85 to-[#303E8A]/85 text-white font-bold"
                        : "bg-gradient-to-l from-[#1EEF32]/20 from-5% to-[#303E8A]/20 to-54%  font-light"
                    }`}
                    onClick={() => {
                      playSound();
                      setSelectedCategory("ai_art");
                    }}
                  >
                    {t("categories.ai_art")}
                  </button>
                  <button
                    className={`py-1 px-2 text-xs  rounded-lg text-white whitespace-nowrap ${
                      selectedCategory === "ai_chatbots"
                        ? "bg-gradient-to-l from-[#1EEF32]/85 to-[#303E8A]/85 text-white font-bold"
                        : "bg-gradient-to-l from-[#1EEF32]/20 from-5% to-[#303E8A]/20 to-54%  font-light"
                    }`}
                    onClick={() => {
                      playSound();
                      setSelectedCategory("ai_chatbots");
                    }}
                  >
                    {t("categories.ai_chatbots")}
                  </button>
                  <button
                    className={`py-1 px-2 text-xs  rounded-lg text-white whitespace-nowrap ${
                      selectedCategory === "ai_writing"
                        ? "bg-gradient-to-l from-[#1EEF32]/85 to-[#303E8A]/85 text-white font-bold"
                        : "bg-gradient-to-l from-[#1EEF32]/20 from-5% to-[#303E8A]/20 to-54%  font-light"
                    }`}
                    onClick={() => {
                      playSound();
                      setSelectedCategory("ai_writing");
                    }}
                  >
                    {t("categories.ai_writing")}
                  </button>
                  <button
                    className={`py-1 px-2 text-xs  rounded-lg text-white whitespace-nowrap ${
                      selectedCategory === "voice_to_text"
                        ? "bg-gradient-to-l from-[#1EEF32]/85 to-[#303E8A]/85 text-white font-bold"
                        : "bg-gradient-to-l from-[#1EEF32]/20 from-5% to-[#303E8A]/20 to-54%  font-light"
                    }`}
                    onClick={() => {
                      playSound();
                      setSelectedCategory("voice_to_text");
                    }}
                  >
                    {t("categories.voice_to_text")}
                  </button>
                  <button
                    className={`py-1 px-2 text-xs  rounded-lg text-white whitespace-nowrap ${
                      selectedCategory === "video_editing"
                        ? "bg-gradient-to-l from-[#1EEF32]/85 to-[#303E8A]/85 text-white font-bold"
                        : "bg-gradient-to-l from-[#1EEF32]/20 from-5% to-[#303E8A]/20 to-54%  font-light"
                    }`}
                    onClick={() => {
                      playSound();
                      setSelectedCategory("video_editing");
                    }}
                  >
                    {t("categories.video_editing")}
                  </button>
                </div>
              </div>
              {/* <div className=" fixed bottom-0 z-20 h-32 w-screen mx-auto left-0 right-0 bg-gradient-to-b from-black/0 from-3% via-black/35 via-20% to-black to-58% "></div>
               */}
              <div className="z-0 aispace relative grid grid-cols-2 gap-3 w-[95%] max-w-md mb-5 mx-auto mt-5 overflow-hidden overflow-y-auto pb-14  ">
                {filteredApps.map((item, index) =>
                  item.title === "Smmry" ? null : (
                    <div
                      key={index}
                      className=" h-40 rounded-2xl p-0.5 bg-gradient-to-b from-[#1AE348] to-[#0368C0]  "
                    >
                      <div
                        onClick={() => {
                          playSound();
                          handleapp(item);
                        }}
                        className="w-full bg-[#0a0342] h-full rounded-2xl "
                      >
                        <div
                          className="w-full  h-full rounded-2xl"
                          style={{
                            background:
                              "radial-gradient(111.21% 179.3% at 49.83% 0%, rgba(30, 239, 50, 0.5) 0%, rgba(48, 62, 138, 0) 100%)",
                          }}
                        >
                          <div
                            style={{
                              backgroundImage:
                                "url(https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/aibg.svg)",
                            }}
                            className=" bg-cover bg-center h-[70%]  w-full rounded-2xl"
                          >
                            <div className="w-full h-full rounded-2xl bg-black/65">
                              <div className="w-full h-full rounded-2xl bg-gradient-to-b from-black/0 to-black/75 to-48% ">
                                <div className="w-full h-full bg-gradient-to-b from-black/0 from-30% to-black/75 to-66% rounded-2xl ">
                                  <div className="flex flex-col justify-center items-center gap-2">
                                    <div className=" h-[4rem] flex justify-center items-center  ">
                                      <img
                                        src={item.img}
                                        alt={item.title}
                                        style={{
                                          width: item.width,
                                          height: item.height,
                                        }}
                                      />
                                    </div>
                                    <p className="w-full text-center text-sm font-semibold">
                                      {t(`tools.${item.tool_id}.title`)}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="w-full h-[30%]  flex justify-center items-center ">
                            <div className="w-[90%] mx-auto flex justify-between items-center ">
                              <div className=" flex items-center gap-1 ">
                                <img
                                  src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/Coin_Flip_256x256(1).gif"
                                  className="w-6"
                                />

                                <p className=" text-[13px] font-bold ">
                                  {item.points_earned}
                                </p>
                              </div>
                              <div className=" flex items-center gap-1">
                                {
                                  <CountdownTimerWeb
                                    isFirstClick={item.isFirstClick}
                                    handleCardClick={handleCardClick}
                                    setShowConfetti={setShowConfetti}
                                    toast={toast}
                                    selectedItem={item}
                                    handleapp={handleapp}
                                    fetchData={fetchData}
                                    startTime={item.click_time || ""}
                                  />
                                }
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

          </div>


          {openapp && selectedItem && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
              <div className="relative w-[85%] max-w-md bg-gradient-to-b from-[#1DEC38BF] to-[#0388F8BF] rounded-2xl p-0.5">
                <div className="bg-[#04071A] py-3 px-5 rounded-2xl">
                  <div className="w-full flex justify-end">
                    <button
                      onClick={() => {
                        playSound();
                        handleapp();
                      }}
                      className="text-white"
                    >
                      <FontAwesomeIcon icon={faXmark} />
                    </button>
                  </div>
                  <div className=" flex flex-col justify-center items-center ">
                    <img
                      src={selectedItem.img}
                      alt={selectedItem.title}
                      style={{
                        width: selectedItem.width,
                        height: selectedItem.height,
                      }}
                    />
                    <p className="font-semibold text-white mt-3">
                      {t(`tools.${selectedItem.tool_id}.title`)}
                    </p>
                  </div>
                  <div className="mt-3">
                    <div>
                      <p className="text-[#1EEF32] font-bold">{t("ui.about_app")}</p>
                      <p className="w-full text-white text-xs font-medium mt-1 text-justify ">
                        {t(`tools.${selectedItem.tool_id}.content`)}
                      </p>
                    </div>
                    <div className="mt-5">
                      <p className="text-[#1EEF32] font-bold">
                        {t("ui.conditions_title")}
                      </p>
                      <div className="w-full text-white text-xs font-medium mt-1">
                        <ul className="flex flex-col gap-2">
                          {t("ui.conditions", { returnObjects: true }).map((condition, idx) => (
                            <li key={idx} className="text-justify">
                              {condition}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="w-[70%] mx-auto mt-5 flex justify-center items-center"></div>
                  <a
                    onClick={(e) => {
                      e.preventDefault(); // Prevent the default behavior of navigating immediately
                      playSound();
                      handleCardClick(selectedItem.tool_id);
                      window.open(selectedItem.link, "_blank"); // Open the link after handleCardClick
                    }}
                    href={selectedItem.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative"
                  >
                    <div
                      className=" rounded-xl w-[80%] mx-auto h-9 relative"
                      style={{
                        backgroundImage:
                          "linear-gradient(to bottom, #0C1E91 17%, #B9C2F8 27%, #505BA1 36%, #0D1547 49%, #060C31 92%, #CCD1F2 93%, #172683 96%)",
                      }}
                    >
                      <div className="h-9 w-full absolute top-0 rounded-xl mix-blend-overlay bg-gradient-to-b from-[#1EEF32] to-[#0285FF] opacity-40  "></div>
                      <div className="h-9 w-full rounded-xl absolute top-0 mix-blend-multiply bg-gradient-to-b from-[#1EEF32] to-[#0285FF]  "></div>
                      <div className=" bg-[#070e3a4b] backdrop-blur-sm h-9 rounded-xl w-full border-[0.5px] border-[#1AE348] "></div>
                      <div className="w-full h-full absolute top-0 bottom-0 flex items-center justify-center">
                        <p
                          className="uppercase text-sm font-medium text-center font-zendots"
                          style={{
                            color: "transparent",
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                            backgroundImage:
                              "linear-gradient(to right, #0285FF, #1EEF32)",
                          }}
                        >
                          {t("ui.launch_app")}
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          )}
          
          {opentask && (
            <div className="fixed inset-0 w-full z-50 backdrop-blur-md ">
              <div className=" w-full max-w-md mx-auto ">
                <AISpaceTaskWeb
                  setOpenTask={setOpenTask}
                  canClaim={canClaim}
                  mission={mission}
                  handleStart={handleStart}
                  onNext={() => {
                    setOpenTask(false);
                    setOpenTask2(true);
                  }}
                />
              </div>
            </div>
          )}
          {opentask2 && (
            <div className="fixed inset-0 w-full z-50 backdrop-blur-md ">
              <div className=" w-full max-w-md mx-auto ">
                <AISpaceTask2Web
                  handletask2={handletask2}
                  handleStart={handleStart}
                  mission={mission}
                  claimReward={claimReward}
                  canClaim={isClaimed}
                  isClaimed={canClaim}
                  CloseTask2={() => {
                    setOpenTask2(false);
                    setOpenTask(false);
                  }}
                />
              </div>
            </div>
          )}
        </div>
        </DashboardLayout>
  );
};

export default AiSpaceWeb;
