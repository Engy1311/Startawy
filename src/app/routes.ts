import { createBrowserRouter } from "react-router";
import { LandingPage } from "./pages/LandingPage";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { Dashboard } from "./pages/Dashboard";
import { Plans } from "./pages/Plans";
import { BudgetAnalysis } from "./pages/BudgetAnalysis";
import { GenerateBudgetReport } from "./pages/GenerateBudgetReport";
import { AIChatbot } from "./pages/AIChatbot";
import { MarketReports } from "./pages/MarketReports";
import { StartawyLibrary } from "./pages/StartawyLibrary";
import { BookConsultant } from "./pages/BookConsultant";
import { BookSessionProfessional } from "./pages/BookSessionProfessional";
import { ConsultantProfile } from "./pages/ConsultantProfile";
import MySessions from "./pages/MySessions";
import { Profile } from "./pages/Profile";
import { Feedback } from "./pages/Feedback";
import EditProfile from "./pages/EditProfile";
import PaymentPage from "./pages/PaymentPage";
import { MyPayments } from "./pages/MyPayments";
import { MyPlan } from "./pages/MyPlan";
import AddPaymentMethod from "./pages/AddPaymentMethod";
import ConsultantDashboard from "./pages/consultant/ConsultantDashboard";
import ConsultantSessions from "./pages/consultant/MySessions";
import MyClients from "./pages/consultant/MyClients";
import ClientDetails from "./pages/consultant/ClientDetails";
import AddReview from "./pages/consultant/AddReview";
import ScheduleMeeting from "./pages/consultant/ScheduleMeeting";
import SendMessage from "./pages/consultant/SendMessage";
import MyEarnings from "./pages/consultant/MyEarnings";
import AvailabilitySchedule from "./pages/consultant/AvailabilitySchedule";
import Recommendations from "./pages/consultant/Recommendations";
import StartupDetails from "./pages/consultant/StartupDetails";
import FollowUpPlans from "./pages/consultant/FollowUpPlans";
import ConsultantProfilePage from "./pages/consultant/ConsultantProfile";
import GenerateReport from "./pages/consultant/GenerateReport";
import EditConsultantProfile from "./pages/consultant/EditConsultantProfile";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageFounders from "./pages/admin/ManageFounders";
import ManagePackages from "./pages/admin/ManagePackages";
import ManageConsultants from "./pages/admin/ManageConsultants";
import AddConsultant from "./pages/admin/AddConsultant";
import ReviewFeedback from "./pages/admin/ReviewFeedback";
import Analytics from "./pages/admin/Analytics";
import AdminProfilePage from "./pages/admin/AdminProfile";
import EditAdminProfile from "./pages/admin/EditAdminProfile";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/signup",
    Component: SignUp,
  },
  {
    path: "/dashboard",
    Component: Dashboard,
  },
  {
    path: "/plans",
    Component: Plans,
  },
  {
    path: "/budget-analysis",
    Component: BudgetAnalysis,
  },
  {
    path: "/generate-budget-report",
    Component: GenerateBudgetReport,
  },
  {
    path: "/ai-chatbot",
    Component: AIChatbot,
  },
  {
    path: "/market-reports",
    Component: MarketReports,
  },
  {
    path: "/startawy-library",
    Component: StartawyLibrary,
  },
  {
    path: "/book-consultant",
    Component: BookConsultant,
  },
  {
    path: "/book-session-professional",
    Component: BookSessionProfessional,
  },
  {
    path: "/consultant/:id",
    Component: ConsultantProfile,
  },
  {
    path: "/my-sessions",
    Component: MySessions,
  },
  {
    path: "/my-plan",
    Component: MyPlan,
  },
  {
    path: "/my-payments",
    Component: MyPayments,
  },
  {
    path: "/profile",
    Component: Profile,
  },
  {
    path: "/edit-profile",
    Component: EditProfile,
  },
  {
    path: "/feedback",
    Component: Feedback,
  },
  {
    path: "/payment",
    Component: PaymentPage,
  },
  {
    path: "/add-payment-method",
    Component: AddPaymentMethod,
  },
  {
    path: "/consultant/dashboard",
    Component: ConsultantDashboard,
  },
  {
    path: "/consultant/sessions",
    Component: ConsultantSessions,
  },
  {
    path: "/consultant/clients",
    Component: MyClients,
  },
  {
    path: "/consultant/client/:id",
    Component: ClientDetails,
  },
  {
    path: "/consultant/client/:id/add-review",
    Component: AddReview,
  },
  {
    path: "/consultant/client/:id/schedule-meeting",
    Component: ScheduleMeeting,
  },
  {
    path: "/consultant/client/:id/send-message",
    Component: SendMessage,
  },
  {
    path: "/consultant/client/:id/generate-report",
    Component: GenerateReport,
  },
  {
    path: "/consultant/earnings",
    Component: MyEarnings,
  },
  {
    path: "/consultant/availability",
    Component: AvailabilitySchedule,
  },
  {
    path: "/consultant/recommendations",
    Component: Recommendations,
  },
  {
    path: "/consultant/startup-details",
    Component: StartupDetails,
  },
  {
    path: "/consultant/follow-up-plans",
    Component: FollowUpPlans,
  },
  {
    path: "/consultant/profile",
    Component: ConsultantProfilePage,
  },
  {
    path: "/consultant/edit-profile",
    Component: EditConsultantProfile,
  },
  {
    path: "/admin/dashboard",
    Component: AdminDashboard,
  },
  {
    path: "/admin/founders",
    Component: ManageFounders,
  },
  {
    path: "/admin/consultants",
    Component: ManageConsultants,
  },
  {
    path: "/admin/packages",
    Component: ManagePackages,
  },
  {
    path: "/admin/add-consultant",
    Component: AddConsultant,
  },
  {
    path: "/admin/feedback",
    Component: ReviewFeedback,
  },
  {
    path: "/admin/analytics",
    Component: Analytics,
  },
  {
    path: "/admin/profile",
    Component: AdminProfilePage,
  },
  {
    path: "/admin/edit-profile",
    Component: EditAdminProfile,
  },
  {
    path: "*",
    Component: NotFound,
  },
]);