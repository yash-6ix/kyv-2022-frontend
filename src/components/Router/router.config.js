import asyncComponent from "../../util/asyncComponent";
import { ADMIN, USER } from "../../constants/LookupConst";
// import { PlayCircleOutlined } from "@ant-design/icons";

// right now /user/login and /user/signup use the same scene, but the scene component is remounting when navigating between these two routes
// because each route has a different instance of the scene. It would be nice if we could change this in order to get a more single page app feel
// essentially just load one async component for both /user/login & /user/signup

export const anonymousRoutes = [
    {
        path: "/user",
        component: asyncComponent(() => import("../Layout/AnonymousUserLayout")),
        isLayout: true,
        showInMenu: false,
    },
    {
        path: "/user/update/:updateid",
        showInMenu: false,
        component: asyncComponent(() => import("../../scenes/Anonymous/ViewUpdate")),
    },
    {
        path: "/user/commitment/:commitmentId",
        showInMenu: true,
        component: asyncComponent(() => import("../../scenes/User/CommitmentTracker/Commitment")),
    },
    {
        path: "/user/topic/:slug",
        showInMenu: false,
        component: asyncComponent(() => import("../../scenes/Anonymous/Topic")),
    },
    {
        path: "/user/under-construction",
        component: asyncComponent(() => import("../../scenes/Auth")),
        showInMenu: false,
    },
    {
        path: "/user/signup",
        component: asyncComponent(() => import("../../scenes/Auth")),
        showInMenu: false,
    },
    {
        path: "/user/reset-password",
        component: asyncComponent(() => import("../../scenes/Auth")),
        showInMenu: false,
    },
    {
        path: "/user/reset-password-success",
        component: asyncComponent(() => import("../../scenes/Auth")),
        showInMenu: false,
    },
    {
        path: "/user/trouble-signing-in",
        component: asyncComponent(() => import("../../scenes/Auth")),
        showInMenu: false,
    },
    {
        path: "/user/trouble-signing-in-success",
        component: asyncComponent(() => import("../../scenes/Auth")),
        showInMenu: false,
    },
];

export const authenticatedRoutes = [
    {
        path: "/",
        exact: true,
        component: asyncComponent(() => import("../Layout/AuthenticatedUserLayout")),
        isLayout: true,
        showInMenu: false,
    },
    {
        path: "/admin/manage-candidates",
        role: [ADMIN],
        showInMenu: false,
        component: asyncComponent(() => import("../../scenes/Admin/ManageCandidates")),
    },
    {
        path: "/admin/dashboard",
        role: [ADMIN],
        showInMenu: false,
        component: asyncComponent(() => import("../../scenes/Admin/Dashboard")),
    },
    {
        path: "/admin/client/new",
        role: [ADMIN],
        showInMenu: false,
        component: asyncComponent(() => import("../../scenes/Admin/Client/NewClient")),
    },
    {
        path: "/admin/client/:clientId",
        role: [ADMIN],
        showInMenu: false,
        component: asyncComponent(() => import("../../scenes/Admin/Client")),
    },
    {
        path: "/admin/client/:clientId/edit-email",
        role: [ADMIN],
        showInMenu: false,
        component: asyncComponent(() => import("../../scenes/Admin/EditEmail")),
    },
    {
        path: "/admin/updates",
        role: [ADMIN],
        showInMenu: false,
        component: asyncComponent(() => import("../../scenes/Admin/Updates/index")),
    },
    {
        path: "/admin/updates/edit-update",
        role: [ADMIN],
        showInMenu: false,
        component: asyncComponent(() => import("../../scenes/Admin/Updates/NewUpdate")),
    },
    {
        path: "/admin/commitments/edit-commitment",
        role: [ADMIN],
        showInMenu: false,
        component: asyncComponent(() => import("../../scenes/Admin/Commitments/AddCommitment")),
    },
    {
        path: "/admin/commitments",
        role: [ADMIN],
        showInMenu: false,
        component: asyncComponent(() => import("../../scenes/Admin/Commitments/AllCommitments")),
    },
    {
        path: "/dashboard",
        role: [USER],
        showInMenu: true,
        title: "sidebar.gettingstarted",
        component: asyncComponent(() => import("../../scenes/User/Dashboard")),
    },
    {
        path: "/ridings-map",
        role: [USER],
        showInMenu: true,
        title: "sidebar.gettingstarted",
        component: asyncComponent(() => import("../../scenes/User/RidingsMap")),
    },
    {
        path: "/commitment-tracker/:commitmentId",
        role: [USER],
        showInMenu: true,
        title: "sidebar.gettingstarted",
        component: asyncComponent(() => import("../../scenes/User/CommitmentTracker/Commitment")),
    },
    {
        path: "/all-candidates",
        role: [USER],
        showInMenu: true,
        title: "sidebar.gettingstarted",
        component: asyncComponent(() => import("../../scenes/User/AllCandidates")),
    },
    {
        path: "/ask-the-candidates",
        role: [USER],
        showInMenu: true,
        title: "sidebar.gettingstarted",
        component: asyncComponent(() => import("../../scenes/User/AskTheCandidates")),
    },
];

export const routers = [...anonymousRoutes, ...authenticatedRoutes];
