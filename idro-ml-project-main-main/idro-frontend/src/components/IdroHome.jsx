/* eslint-disable */
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom";
import idroLogo from "../assets/logo.png";
import DonationModal from "./DonationModal";
import {
  Bell,
  FileText,
  LayoutDashboard,
  Phone,
  ShieldAlert,

  // Added for Response Modal
  Siren,

  // Added for Deploy Button
  Tent,
  TriangleAlert,
  Truck,
  Users,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Circle, MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Link } from "react-router-dom";
import { idroApi } from "../services/api"; // --- LEAFLET ICON FIX ---
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
}); // --- DIAMOND ICONS LOGIC ---
const getIcon = (status, type, trustScore) => {
  const isConfirmedDisaster = trustScore > 75;
  if (isConfirmedDisaster) {
    return L.divIcon({
      className: "custom-icon-disaster",
      html: `<div class="relative flex items-center justify-center w-8 h-8"> <div class="relative w-4 h-4 bg-danger border-[1.5px] border-white/80 shadow-sm rotate-45 flex items-center justify-center z-10 transition-colors duration-200 hover:bg-white/20"> <div class="w-1 h-1 bg-white rounded-full"></div> </div> </div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -16],
    });
  } else {
    return L.divIcon({
      className: "custom-icon-pre",
      html: `<div class="relative flex items-center justify-center w-8 h-8"> <div class="relative w-3.5 h-3.5 bg-warning border-[1.5px] border-white/80 shadow-sm rotate-45 z-10 flex items-center justify-center transition-colors duration-200 hover:bg-white/20"> <div class="w-1 h-1 bg-white rounded-full"></div> </div> </div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -16],
    });
  }
}; // --- MARKER COMPONENT ---
const AlertMarker = ({ alert }) => {
  const [locationName, setLocationName] = useState("...");
  useEffect(() => {
    const fetchAddress = async () => {
      if (alert.location.includes("Report") || alert.location.includes("(")) {
        try {
          const res = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${alert.latitude}&lon=${alert.longitude}`,
          );
          const addr = res.data.address;
          const city =
            addr.city ||
            addr.town ||
            addr.village ||
            addr.county ||
            "Unknown Sector";
          const state = addr.state || "";
          const country = addr.country || "";
          setLocationName(`${city}, ${state}, ${country}`);
        } catch (e) {
          setLocationName("Remote Sector, India");
        }
      } else {
        setLocationName(alert.location);
      }
    };
    fetchAddress();
  }, [alert]);
  return (
    <Marker
      position={[alert.latitude || 20, alert.longitude || 78]}
      icon={getIcon(alert.missionStatus, alert.sourceType, alert.trustScore)}
    >
      {" "}
      <Popup className="custom-popup-dark">
        {" "}
        <div className="p-2 bg-[#1e293b] text-slate-200 rounded-lg border border-white/5 shadow-lg">
          {" "}
          <h3 className="text-sm font-bold text-slate-100 mb-1 border-b border-subtle pb-1">
            {" "}
            {locationName}{" "}
          </h3>{" "}
          <strong className="uppercase text-info text-xs block mb-1">
            {alert.type}
          </strong>{" "}
          <p className="text-[10px] text-slate-400 font-medium mb-2">
            {alert.details}
          </p>{" "}
        </div>{" "}
      </Popup>{" "}
      {alert.missionStatus === "OPEN" && (
        <Circle
          center={[alert.latitude, alert.longitude]}
          radius={60000}
          pathOptions={{
            color: "#ef4444",
            fillColor: "#ef4444",
            fillOpacity: 0.1,
            weight: 1,
          }}
        />
      )}{" "}
    </Marker>
  );
};
export default function IdroHome() {
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState([]);
  const [showDisasterModal, setShowDisasterModal] = useState(false);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [showDonationModal, setShowDonationModal] = useState(false);
  // Donation Modal State
  useEffect(() => {
    const fetchPublicAlerts = async () => {
      try {
        const res = await idroApi.getAlerts();
        if (res.data && res.data.length > 0) {
          const publicAlerts = res.data.filter(
            (a) => a.missionStatus === "OPEN" && a.trustScore > 75,
          );
          setAlerts(publicAlerts);
        }
      } catch (err) {
        console.error("API Error");
      }
    };
    fetchPublicAlerts();
    const interval = setInterval(fetchPublicAlerts, 10000);
    return () => clearInterval(interval);
  }, []);
  return (
    // ✅ h-screen + overflow-hidden prevents the "White Blank Page" issue
    <div className="h-screen w-screen bg-[#0B0D14] font-sans text-slate-300 flex flex-col overflow-hidden relative">
      {" "}
      {/* --- TICKER --- */}{" "}
      <div className="bg-[#0B0D14] border-b border-[#222834] text-slate-400 text-[11px] font-semibold py-2.5 overflow-hidden flex items-center relative z-50 shrink-0">
        {" "}
        <div className="bg-[#0B0D14] px-6 py-2.5 absolute left-0 z-10 flex items-center gap-2 border-r border-[#222834] text-slate-300 uppercase tracking-widest">
          {" "}
          <ShieldAlert size={14} className="text-slate-400" /> LIVE INTEL{" "}
        </div>{" "}
        <div className="whitespace-nowrap animate-marquee pl-44 flex gap-16 text-slate-300">
          {" "}
          {alerts.length > 0 ? (
            alerts.map((alert, idx) => (
              <span key={idx}>
                ⚠️ {alert.type}: {alert.location} - {alert.details}
              </span>
            ))
          ) : (
            <span>
              🟢 System monitoring active - No critical alerts at this time
            </span>
          )}{" "}
        </div>{" "}
      </div>{" "}
      {/* --- HEADER --- */}{" "}
      <header className="bg-[#131722] border-b border-[#222834] shrink-0 z-50 py-1">
        {" "}
        <div className="max-w-[1920px] mx-auto px-6">
          {" "}
          <div className="flex justify-between items-center h-12">
            {" "}
            {/* LEFT BRAND (ONLY THIS IS VISUALLY UPDATED) */}{" "}
            <div className="flex items-baseline gap-3">
              {" "}
              {/* Logo */}{" "}
              <img src={idroLogo} alt="IDRO Logo" className="h-10 w-auto " />{" "}
              {/* Text */}{" "}
              <div className="flex flex-col">
                {" "}
                <div className="flex items-center gap-4">
                  {" "}
                  {/* IDRO (Improved font + glow) */}{" "}
                  <h1 className="text-2xl font-black tracking-[0.15em] text-white">
                    {" "}
                    IDRO{" "}
                  </h1>{" "}
                  {/* Full form (bigger) */}{" "}
                  <span className="text-sm text-slate-400 font-medium tracking-wide mt-1">
                    {" "}
                    Intelligent Disaster Resource Optimizer{" "}
                  </span>{" "}
                </div>{" "}
                {/* Tagline unchanged */}{" "}
                <p className="text-[10px] text-slate-500 font-medium tracking-widest uppercase mt-0.5">
                  {" "}
                  One Platform To Save Millions Of Life{" "}
                </p>{" "}
              </div>{" "}
            </div>{" "}
            {/* RIGHT NAVIGATION (UNCHANGED) */}{" "}
            <nav className="hidden md:flex items-center gap-4">
              {" "}
              <Link
                to="/command"
                className="flex items-center gap-2 px-3 py-2 rounded-md text-xs font-semibold text-slate-400 hover:text-white hover:bg-[#1E293B]/80 active:bg-[#1E293B] active:text-slate-300 transition-colors duration-200 ease-out"
              >
                {" "}
                <LayoutDashboard size={14} /> DASHBOARD{" "}
              </Link>{" "}
              <Link
                to="/Login"
                className="flex items-center gap-2 px-3 py-2 rounded-md text-xs font-semibold text-slate-400 hover:text-white hover:bg-[#1E293B]/80 active:bg-[#1E293B] active:text-slate-300 transition-colors duration-200 ease-out"
              >
                {" "}
                <LayoutDashboard size={14} />
                Login{" "}
              </Link>{" "}
              <Link
                to="/about"
                className="flex items-center gap-2 px-3 py-2 rounded-md text-xs font-semibold text-slate-400 hover:text-white hover:bg-[#1E293B]/80 active:bg-[#1E293B] active:text-slate-300 transition-colors duration-200 ease-out"
              >
                {" "}
                <FileText size={14} /> ABOUT{" "}
              </Link>{" "}
              <button
                onClick={() => setShowDonationModal(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-md text-xs font-bold text-[#0A0F1C] bg-white border border-white/90 shadow-sm hover:shadow-md hover:bg-slate-100 active:bg-slate-200 active:scale-[0.98] transition-all duration-200 ease-out ml-4"
              >
                {" "}
                DONATE NOW{" "}
              </button>{" "}
            </nav>{" "}
          </div>{" "}
        </div>{" "}
      </header>{" "}
      {/* --- STATS BAR --- */}{" "}
      <div className="bg-[#0B0D14] border-b border-[#222834] shrink-0 z-40">
        {" "}
        <div className="max-w-[1920px] mx-auto px-6 py-2 flex justify-between items-center gap-6 text-[11px]">
          {" "}
          <div className="flex items-center gap-4 text-slate-300 font-mono font-semibold">
            {" "}
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>{" "}
              SYSTEM: ONLINE
            </span>{" "}
          </div>{" "}
          <div className="flex gap-6 font-mono">
            {" "}
            <div className="flex items-center gap-2 font-semibold text-slate-400">
              <Users size={14} className="text-cyan-600" /> VOLUNTEERS READY
            </div>{" "}
            <div className="flex items-center gap-2 font-semibold text-slate-400">
              <Tent size={14} className="text-amber-500" /> RELIEF CAMPS STANDBY
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      {/* --- MAIN DASHBOARD AREA (Fills Remaining Space) --- */}{" "}
      <div className="flex-1 flex flex-col p-2 md:p-3 gap-2 lg:gap-3 overflow-hidden z-30 max-w-[1920px] w-full mx-auto pb-4">
        {" "}
        {/* TOP CARDS ROW */}{" "}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-3 shrink-0">
          {" "}
          {/* Card 1: Active Disasters */}{" "}
          <div
            onClick={() => navigate("/active-disasters")}
            className="cursor-pointer bg-[#131722] rounded-lg py-2.5 px-3 md:px-4 border border-[#222834] shadow-sm hover:border-[#333C4D] hover:bg-[#1A1F2E] active:bg-[#131722] transition-colors duration-200 ease-out flex items-center gap-4 relative overflow-hidden"
          >
            {" "}
            <div className="w-8 h-8 shrink-0 rounded-lg bg-red-900/20 border border-red-900/30 flex items-center justify-center text-red-500">
              <TriangleAlert size={16} />
            </div>{" "}
            <div className="flex flex-col gap-1">
              {" "}
              <h3 className="font-bold text-slate-100 text-sm uppercase tracking-wider">
                Active Disasters
              </h3>{" "}
              <p className="text-[10px] text-slate-500 font-medium tracking-wide">
                CLICK TO VIEW ALL
              </p>{" "}
            </div>{" "}
          </div>{" "}
          {/* Card 2: Impact Analysis */}{" "}
          <div
            onClick={() => navigate("/impact-analysis")}
            className="cursor-pointer bg-[#131722] rounded-lg py-2.5 px-3 md:px-4 border border-[#222834] shadow-sm hover:border-[#333C4D] hover:bg-[#1A1F2E] active:bg-[#131722] transition-colors duration-200 ease-out flex items-center gap-4 relative overflow-hidden"
          >
            {" "}
            <div className="w-8 h-8 shrink-0 rounded-lg bg-amber-900/20 border border-amber-900/30 flex items-center justify-center text-amber-500">
              <TriangleAlert size={16} />
            </div>{" "}
            <div className="flex flex-col gap-1">
              {" "}
              <h3 className="font-bold text-slate-100 text-sm uppercase tracking-wider">
                {" "}
                Impact Analysis{" "}
              </h3>{" "}
              <p className="text-[10px] text-slate-500 font-medium tracking-wide">
                {" "}
                AI GENERATED NEEDS{" "}
              </p>{" "}
            </div>{" "}
          </div>{" "}
          {/* Card 3: Mission Control (Neutralized from Cyan) */}{" "}
          <div
            onClick={() => navigate("/mission-control")}
            className="cursor-pointer bg-[#131722] rounded-lg py-2.5 px-3 md:px-4 border border-[#222834] shadow-sm hover:border-[#333C4D] hover:bg-[#1A1F2E] active:bg-[#131722] transition-colors duration-200 ease-out flex items-center gap-4 relative overflow-hidden"
          >
            {" "}
            <div className="w-8 h-8 shrink-0 rounded-lg bg-slate-800/50 border border-slate-700/50 flex items-center justify-center text-slate-400">
              <Siren size={16} />
            </div>{" "}
            <div className="flex flex-col gap-1">
              {" "}
              <h3 className="font-bold text-slate-100 text-sm uppercase tracking-wider">
                {" "}
                Mission Control{" "}
              </h3>{" "}
              <p className="text-[10px] text-slate-500 font-medium tracking-wide">
                {" "}
                AI AUTO-ALLOCATION{" "}
              </p>{" "}
            </div>{" "}
          </div>{" "}
          {/* Card 4: Deployment Status */}{" "}
          <div
            onClick={() => navigate("/deployment-status")}
            className="cursor-pointer bg-[#131722] rounded-lg py-2.5 px-3 md:px-4 border border-[#222834] shadow-sm hover:border-[#333C4D] hover:bg-[#1A1F2E] active:bg-[#131722] transition-colors duration-200 ease-out flex items-center gap-4 relative overflow-hidden"
          >
            {" "}
            <div className="w-8 h-8 shrink-0 rounded-lg bg-emerald-900/20 border border-emerald-900/30 flex items-center justify-center text-emerald-500">
              <Truck size={16} />
            </div>{" "}
            <div className="flex flex-col gap-1">
              {" "}
              <h3 className="font-bold text-slate-100 text-sm uppercase tracking-wider">
                {" "}
                Deployment Status{" "}
              </h3>{" "}
              <p className="text-[10px] text-slate-500 font-medium tracking-wide">
                {" "}
                LIVE FIELD TRACKING{" "}
              </p>{" "}
            </div>{" "}
          </div>{" "}
        </section>{" "}
        {/* BOTTOM SPLIT: MAP (Fills space) + LIST */}{" "}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[75fr_25fr] gap-2 lg:gap-3 min-h-0">
          {" "}
          {/* --- MAP CONTAINER (75%) --- */}{" "}
          <div className="bg-[#0B0D14] p-2 rounded-lg border border-[#222834] shadow-[0_4px_24px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden relative min-h-[80vh] h-full z-10">
            {" "}
            {/* Map Header Strip */}{" "}
            <div className="px-6 py-4 border-b border-[#222834] bg-[#0B0D14] flex justify-between items-center shrink-0">
              {" "}
              <h2 className="font-semibold text-slate-200 text-xs uppercase tracking-widest flex items-center gap-2">
                {" "}
                <MapContainer className="hidden" />{" "}
                {/* Hack to just get the icon if needed, or just use text */}{" "}
                <span>Global Theatre Overview</span>{" "}
              </h2>{" "}
              <div className="flex items-center gap-3">
                {" "}
                <span className="flex items-center gap-2 text-[10px] font-bold text-cyan-500 uppercase tracking-wider">
                  {" "}
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-500"></div>{" "}
                  Live Tracking{" "}
                </span>{" "}
              </div>{" "}
            </div>{" "}
            {/* Map Body */}{" "}
            <div className="flex-1 bg-[#0A0C13] w-full h-full relative rounded border border-t-0 border-[#222834]">
              {" "}
              <MapContainer
                center={[22.5, 82.0]}
                zoom={5}
                className="w-full h-full z-0"
                zoomControl={false}
              >
                {" "}
                <TileLayer
                  url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                  attribution="Esri"
                />{" "}
                <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}" />{" "}
                {alerts.map((alert) => (
                  <AlertMarker key={alert.id} alert={alert} />
                ))}{" "}
              </MapContainer>{" "}
            </div>{" "}
          </div>{" "}
          {/* --- RIGHT LIST (25%, Internal Scroll) --- */}{" "}
          <div className="bg-[#131722] rounded-lg border border-[#222834] shadow-[0_4px_24px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden relative h-full z-10">
            {" "}
            <div className="px-6 py-4 border-b border-[#222834] flex justify-between items-center bg-[#131722] shrink-0">
              {" "}
              <h2 className="font-bold text-slate-100 text-xs uppercase tracking-[0.2em] flex items-center gap-2">
                <Bell size={14} className="text-slate-400" /> INTEL STREAM
              </h2>{" "}
              <div className="flex items-center gap-2 px-2 py-0.5 bg-red-950/40 rounded-sm border border-red-900/50 shadow-sm">
                {" "}
                <div className="w-1.5 h-1.5 bg-red-500 animate-[pulse_1.5s_ease-in-out_infinite] shadow-[0_0_8px_rgba(239,68,68,0.8)]"></div>{" "}
                <span className="text-[9px] text-red-500 font-bold uppercase tracking-[0.2em]">
                  LIVE
                </span>{" "}
              </div>{" "}
            </div>{" "}
            <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#0B0D14]">
              {" "}
              {/* Intel Feed Item Wrapper */}{" "}
              <div className="p-4 border-b border-[#222834] hover:bg-[#131722] active:bg-[#1A1F2E] transition-colors duration-150 ease-out group">
                {" "}
                <div className="flex justify-between items-baseline mb-2">
                  {" "}
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-wider bg-slate-800 text-slate-300 border border-slate-700">
                    SYSTEM
                  </span>{" "}
                  <span className="text-[9px] text-slate-500 font-medium font-mono text-right tracking-widest">
                    JUST NOW
                  </span>{" "}
                </div>{" "}
                <p className="text-[11px] text-slate-300 leading-snug font-medium">
                  System on Standby. Sequential Intel Feed offline.
                </p>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      {/* --- SOS BUTTON --- */}{" "}
      <div className="fixed bottom-8 right-8 z-[90]">
        {" "}
        <button className="bg-[#131722] hover:bg-[#1A1F2E] text-red-500 w-14 h-14 rounded-lg flex items-center justify-center shadow-lg transition-all duration-200 border border-[#222834] hover:border-red-900/50 hover:shadow-red-900/20 group focus:outline-none">
          {" "}
          <Phone
            size={22}
            className="fill-current transition-transform duration-200 ease-out"
          />{" "}
        </button>{" "}
      </div>{" "}
      {/* --- MODAL 1: ACTIVE DISASTERS (FILTERED: Only Disasters, No Deploy Button) --- */}{" "}
      {showDisasterModal && (
        <div className="fixed inset-0 z-[100] bg-primary backdrop-blur-sm flex items-center justify-center p-4">
          {" "}
          <div className="bg-[#111827] w-full max-w-2xl rounded-lg border border-[#1E293B] shadow-2xl shadow-black/50 flex flex-col max-h-[80vh] relative overflow-hidden before:absolute before:inset-x-0 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent before:z-10">
            {" "}
            <div className="flex justify-between items-center p-6 border-b border-subtle bg-slate-800/50">
              {" "}
              <h2 className="text-xl font-bold text-slate-100 tracking-wider flex items-center gap-3">
                {" "}
                <TriangleAlert className="text-danger" /> ACTIVE DISASTERS{" "}
              </h2>{" "}
              <button
                onClick={() => setShowDisasterModal(false)}
                className="text-secondary hover:text-primary transition-colors"
              >
                <X size={24} />
              </button>{" "}
            </div>{" "}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
              {" "}
              {/* Only show CONFIRMED DISASTERS (Trust > 75) */}{" "}
              {alerts.filter((a) => a.trustScore > 75).length === 0 ? (
                <div className="text-center text-secondary py-10">
                  No Confirmed Disasters. Only Pre-Alerts Active.
                </div>
              ) : (
                alerts
                  .filter((a) => a.trustScore > 75)
                  .map((alert) => (
                    <div
                      key={alert.id}
                      className="bg-primary p-6 rounded-lg border border-subtle hover:bg-white/5 hover:border-white/10 active:bg-white/10 transition-colors duration-200 ease-out flex justify-between items-center group"
                    >
                      {" "}
                      <div>
                        {" "}
                        <div className="flex items-center gap-3 mb-1">
                          {" "}
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider bg-danger text-primary">
                            {" "}
                            {alert.type}{" "}
                          </span>{" "}
                          <span className="text-xs text-red-400 font-mono font-bold animate-pulse">
                            LIVE INCIDENT
                          </span>{" "}
                        </div>{" "}
                        <h3 className="text-lg font-bold text-primary group-hover:text-red-400 transition-colors">
                          {" "}
                          {alert.location}{" "}
                        </h3>{" "}
                        <p className="text-xs text-slate-400 font-medium mt-1">
                          {alert.details}
                        </p>{" "}
                      </div>{" "}
                      {/* NO DEPLOY BUTTON HERE */}{" "}
                    </div>
                  ))
              )}{" "}
            </div>{" "}
          </div>{" "}
        </div>
      )}{" "}
      {/* --- MODAL 2: RESPONSE UNIT DEPLOYMENT (All Missions + Deploy Button) --- */}{" "}
      {showResponseModal && (
        <div className="fixed inset-0 z-[100] bg-primary backdrop-blur-sm flex items-center justify-center p-4">
          {" "}
          <div className="bg-[#111827] w-full max-w-3xl rounded-lg border border-[#1E293B] shadow-2xl shadow-black/50 flex flex-col max-h-[80vh] relative overflow-hidden before:absolute before:inset-x-0 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent before:z-10">
            {" "}
            <div className="flex justify-between items-center p-6 border-b border-subtle bg-slate-800/50">
              {" "}
              <h2 className="text-xl font-bold text-slate-100 tracking-wider flex items-center gap-3">
                {" "}
                <Truck className="text-warning" /> RESPONSE UNIT DEPLOYMENT{" "}
              </h2>{" "}
              <button
                onClick={() => setShowResponseModal(false)}
                className="text-secondary hover:text-primary transition-colors"
              >
                <X size={24} />
              </button>{" "}
            </div>{" "}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
              {" "}
              <p className="text-xs text-slate-400 mb-4 uppercase tracking-widest font-semibold">
                Select Mission for Deployment:
              </p>{" "}
            </div>{" "}
          </div>{" "}
        </div>
      )}{" "}
      {/* --- DONATION MODAL --- */}{" "}
      <DonationModal
        open={showDonationModal}
        onClose={() => setShowDonationModal(false)}
      />{" "}
    </div>
  );
}
