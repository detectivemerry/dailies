import {
  SvgIcon,
  FavoriteOutlined,
  FitnessCenterOutlined,
  LunchDiningOutlined,
  SchoolOutlined,
  AttachMoneyOutlined,
  SentimentSatisfiedAltOutlined,
  QuestionMarkOutlined,
  WorkOutline,
  CreditScoreOutlined,
  SellOutlined,
  SavingsOutlined,
  AccountBalanceOutlined,
  AttachMoneyRounded,
  HotelOutlined,
  RestaurantMenuOutlined,
  TrendingDownOutlined,
  TrendingUpOutlined,
  PsychologyOutlined,
  SelfImprovementOutlined,
  FitnessCenter,
  AccessibilityOutlined,
  DirectionsRunOutlined,
  MonitorWeightOutlined,
  FavoriteRounded,
  SportsCricketOutlined,
  SportsMartialArtsOutlined,
  HikingOutlined,
  AutoStoriesOutlined,
  CreateOutlined,
  TranslateOutlined,
  SchoolRounded,
  WorkHistoryOutlined,
  CoPresentOutlined,
  ArticleOutlined,
  LibraryBooksOutlined,
  AssignmentTurnedInOutlined,
  SportsBaseballOutlined,
  SnowboardingOutlined,
  VolunteerActivism,
  GroupOutlined,
  NaturePeopleOutlined,
  ForumOutlined,
  Public,
  Psychology,
  NotificationAddOutlined,
  EditNotificationsOutlined,
  Groups2Outlined,
  WorkspacePremiumOutlined,
} from "@mui/icons-material";

type SvgIconComponent = typeof SvgIcon;

export default function getAvatarIcon(avatarIcon: string): SvgIconComponent {
  switch (avatarIcon) {
    case "HEALTH":
      return FavoriteOutlined;
    case "DIET":
      return LunchDiningOutlined;
    case "SCHOOL":
      return SchoolOutlined;
    case "CAREER":
      return WorkOutline;
    case "FINANCIAL":
      return AttachMoneyOutlined;
    case "MENTAL_WELLNESS":
      return SentimentSatisfiedAltOutlined;
    case "DEBT_SETTLEMENT":
      return CreditScoreOutlined;
    case "SPENDING":
      return SellOutlined;
    case "SAVINGS":
      return SavingsOutlined;
    case "INVESTMENTS":
      return AccountBalanceOutlined;
    case "FINANCIAL_LITERACY":
      return AttachMoneyRounded;
    case "SLEEP_CYCLE":
      return HotelOutlined;
    case "DIET":
      return RestaurantMenuOutlined;
    case "WEIGHT_LOSS":
      return TrendingDownOutlined;
    case "WEIGHT_GAIN":
      return TrendingUpOutlined;
    case "SELF_REFLECTION":
      return PsychologyOutlined;
    case "MEDITATION":
      return SelfImprovementOutlined;
    case "GYM":
      return FitnessCenter;
    case "BODYWEIGHT":
      return MonitorWeightOutlined;
    case "RUNNING":
      return DirectionsRunOutlined;
    case "FLEXIBILITY":
      return AccessibilityOutlined;
    case "CARDIO":
      return FavoriteRounded;
    case "SPORTS":
      return SportsCricketOutlined;
    case "MARTIAL_ARTS":
      return SportsMartialArtsOutlined;
    case "EXERCISE":
      return HikingOutlined;
    case "READING":
      return AutoStoriesOutlined;
    case "WRITING":
      return CreateOutlined;
    case "LANGUAGE":
      return TranslateOutlined;
    case "LEARNING":
      return SchoolRounded;
    case "JOB_SEARCH":
      return WorkHistoryOutlined;
    case "SKILL_DEVELOPMENT":
      return CoPresentOutlined;
    case "CERTIFICATION":
      return ArticleOutlined;
    case "WORK":
      return WorkOutline;
    case "REVISION":
      return LibraryBooksOutlined;
    case "ASSIGNMENT":
      return AssignmentTurnedInOutlined;
    case "CO-CURRICULAR_ACTIVITIES":
      return SportsBaseballOutlined;
    case "HOBBIES":
      return SnowboardingOutlined;
    case "VOLUNTEERING":
      return VolunteerActivism;
    case "COMMUNITY_INVOLVEMENT":
      return GroupOutlined;
    case "CULTURAL_EXPLORATION":
      return NaturePeopleOutlined;
    case "SOCIAL_CONNECTION":
      return ForumOutlined;
    case "TRAVELLING":
      return Public;
    case "FITNESS":
      return FitnessCenter;
    case "INTELLECTUAL_GROWTH":
      return Psychology;
    case "COMMUNITY_SUBSCRIPTION":
        return NotificationAddOutlined;
    case "GOAL_ADJUSTMENT":
        return EditNotificationsOutlined;
    case "COMMUNITY_ACTIVITY":
        return Groups2Outlined;
    case "MILESTONE":
        return WorkspacePremiumOutlined;
    default:
      return QuestionMarkOutlined;
  }
}
