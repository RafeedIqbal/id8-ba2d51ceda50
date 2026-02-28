import { User, FeatureRequest, Comment } from "../types";

export const MOCK_USERS: User[] = [
  { id: "u_001", name: "sys_admin", role: "admin" },
  { id: "u_002", name: "neo_dev", role: "user" },
  { id: "u_003", name: "trinity_ui", role: "user" },
  { id: "u_004", name: "morpheus_db", role: "user" },
  { id: "u_005", name: "cipher_ops", role: "user" },
  { id: "u_006", name: "tank_sec", role: "user" },
  { id: "u_007", name: "dozer_qa", role: "user" },
  { id: "u_008", name: "ghost_net", role: "user" },
];

export const MOCK_FEATURE_REQUESTS: FeatureRequest[] = [
  {
    id: "fr_101",
    title: "Implement SSH Key Authentication",
    description: "Allow users to authenticate via SSH keys instead of traditional passwords for enhanced CLI security and automated pipeline access.",
    upvotes: 128,
    status: "in-progress",
    authorId: "u_002",
    createdAt: "2023-10-25T14:30:00Z",
  },
  {
    id: "fr_102",
    title: "Global Dark Mode / Terminal Theme",
    description: "The current UI hurts my eyes at 2 AM. We need a proper high-contrast terminal theme with pure black and neon green accents across all dashboards.",
    upvotes: 256,
    status: "completed",
    authorId: "u_003",
    createdAt: "2023-10-20T09:15:00Z",
  },
  {
    id: "fr_103",
    title: "Custom Webhook Integrations",
    description: "Provide the ability to trigger external endpoints when specific events occur within the platform (e.g., build failure, deployment success).",
    upvotes: 89,
    status: "planned",
    authorId: "u_005",
    createdAt: "2023-10-28T16:45:00Z",
  },
  {
    id: "fr_104",
    title: "Export Audit Logs to CSV/JSON",
    description: "Compliance requires us to maintain offline records. Add a feature to bulk export the audit trail for a given date range.",
    upvotes: 42,
    status: "open",
    authorId: "u_006",
    createdAt: "2023-10-30T11:00:00Z",
  },
  {
    id: "fr_105",
    title: "Rate Limiting API Alerts",
    description: "Send an automated alert (via email or webhook) when an API token approaches its monthly rate limit threshold.",
    upvotes: 115,
    status: "planned",
    authorId: "u_004",
    createdAt: "2023-10-31T08:20:00Z",
  },
  {
    id: "fr_106",
    title: "Support for GraphQL API",
    description: "REST is fine, but GraphQL would allow us to fetch complex nested telemetry data in a single request, reducing overhead.",
    upvotes: 15,
    status: "declined",
    authorId: "u_002",
    createdAt: "2023-11-01T10:10:00Z",
  },
  {
    id: "fr_107",
    title: "Multi-Factor Authentication (MFA) Enforcement",
    description: "Add an organization-level setting that forces all users to enable MFA via TOTP before they can access sensitive resources.",
    upvotes: 310,
    status: "in-progress",
    authorId: "u_001",
    createdAt: "2023-11-02T13:55:00Z",
  },
  {
    id: "fr_108",
    title: "Custom CLI Aliases",
    description: "Allow users to define custom shortcodes for complex CLI commands directly within their profile configuration.",
    upvotes: 67,
    status: "open",
    authorId: "u_008",
    createdAt: "2023-11-03T18:30:00Z",
  },
  {
    id: "fr_109",
    title: "Ephemeral Environments for PRs",
    description: "Automatically spin up isolated testing environments for every pull request to allow QA testing before merging to main.",
    upvotes: 204,
    status: "planned",
    authorId: "u_007",
    createdAt: "2023-11-05T09:40:00Z",
  },
  {
    id: "fr_110",
    title: "Deprecate v1 API endpoints",
    description: "We need to forcefully sunset the v1 API. The legacy codebase is becoming a massive security liability and slowing down CI/CD.",
    upvotes: 95,
    status: "open",
    authorId: "u_001",
    createdAt: "2023-11-06T12:25:00Z",
  },
  {
    id: "fr_111",
    title: "Detailed Billing Dashboard",
    description: "The current invoice PDF is too vague. We need a granular breakdown of compute vs storage costs per environment.",
    upvotes: 145,
    status: "in-progress",
    authorId: "u_005",
    createdAt: "2023-11-08T15:15:00Z",
  },
  {
    id: "fr_112",
    title: "Add 'Drafts' Folder to Terminal Sidebar",
    description: "Sometimes I start writing a complex feature request or configuration block and need to step away. A drafts folder would save my progress locally.",
    upvotes: 56,
    status: "open",
    authorId: "u_003",
    createdAt: "2023-11-10T11:50:00Z",
  },
];

export const MOCK_COMMENTS: Comment[] = [
  { id: "c_001", featureRequestId: "fr_101", authorId: "u_001", content: "Security team has approved this. We will schedule it for the next sprint.", createdAt: "2023-10-26T09:00:00Z" },
  { id: "c_002", featureRequestId: "fr_101", authorId: "u_004", content: "Will this support ed25519 keys?", createdAt: "2023-10-26T10:15:00Z" },
  { id: "c_003", featureRequestId: "fr_101", authorId: "u_002", content: "@u_004 Yes, ed25519 is the primary focus due to its performance.", createdAt: "2023-10-26T11:30:00Z" },
  
  { id: "c_004", featureRequestId: "fr_102", authorId: "u_001", content: "Merged into master. Rebooting core systems to apply.", createdAt: "2023-10-22T14:00:00Z" },
  { id: "c_005", featureRequestId: "fr_102", authorId: "u_003", content: "Looks amazing! The green on black is exactly what we needed.", createdAt: "2023-10-22T15:20:00Z" },

  { id: "c_006", featureRequestId: "fr_103", authorId: "u_006", content: "We should ensure we have signature verification for the webhooks so clients can verify the origin.", createdAt: "2023-10-29T08:45:00Z" },
  { id: "c_007", featureRequestId: "fr_103", authorId: "u_005", content: "Agreed. I'll update the spec to include HMAC-SHA256 signatures.", createdAt: "2023-10-29T09:10:00Z" },

  { id: "c_008", featureRequestId: "fr_106", authorId: "u_001", content: "Closing this for now. The engineering effort to maintain two API paradigms is too high right now.", createdAt: "2023-11-02T11:00:00Z" },
  { id: "c_009", featureRequestId: "fr_106", authorId: "u_002", content: "Understood. Perhaps we can revisit next year?", createdAt: "2023-11-02T12:30:00Z" },

  { id: "c_010", featureRequestId: "fr_107", authorId: "u_005", content: "This is critical. Too many instances of weak passwords being reused.", createdAt: "2023-11-03T09:00:00Z" },
  { id: "c_011", featureRequestId: "fr_107", authorId: "u_008", content: "Will hardware keys (YubiKey) be supported out of the box?", createdAt: "2023-11-03T10:15:00Z" },
  { id: "c_012", featureRequestId: "fr_107", authorId: "u_001", content: "Phase 1 is TOTP apps only. WebAuthn for hardware keys is planned for Phase 2.", createdAt: "2023-11-03T11:45:00Z" },

  { id: "c_013", featureRequestId: "fr_109", authorId: "u_006", content: "This would save my QA team at least 15 hours a week.", createdAt: "2023-11-06T08:30:00Z" },
  { id: "c_014", featureRequestId: "fr_109", authorId: "u_002", content: "We need to monitor cloud costs carefully with this. Spawning full envs can get expensive quickly.", createdAt: "2023-11-06T09:45:00Z" },
  { id: "c_015", featureRequestId: "fr_109", authorId: "u_007", content: "@u_002 We can set a TTL (Time To Live) of 4 hours for each env to manage costs.", createdAt: "2023-11-06T10:20:00Z" },

  { id: "c_016", featureRequestId: "fr_112", authorId: "u_004", content: "I usually just use a local .txt file, but having it synced across devices would be neat.", createdAt: "2023-11-11T09:00:00Z" },
  { id: "c_017", featureRequestId: "fr_112", authorId: "u_003", content: "Exactly! Plus, we could use local storage for a quick MVP.", createdAt: "2023-11-11T09:15:00Z" }
];
