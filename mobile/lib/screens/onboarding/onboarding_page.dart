class OnboardingPage {
  final String? title;
  final String? description;
  final String? lottieAsset;
  final String? question;
  final List<String>? options;

  OnboardingPage({
    this.title,
    this.description,
    this.lottieAsset,
    this.question,
    this.options,
  });
}

final onboardingPages = [
  OnboardingPage(
    title: "Chào mừng!",
    description: "Khám phá ứng dụng tuyệt vời của chúng tôi.",
    lottieAsset: "lib/assets/animations/onboarding1.json",
  ),
  OnboardingPage(
    question: "Bạn học tiếng Anh để làm gì?",
    options: ["Du lịch", "Công việc", "Học tập", "Giao tiếp hằng ngày"],
  ),
  OnboardingPage(
    question: "Bạn muốn đạt được trình độ nào?",
    options: ["Cơ bản", "Trung cấp", "Nâng cao", "Thành thạo"],
  ),
  OnboardingPage(
    title: "Bạn đã sẵn sàng chưa?",
    description: "Mình sẽ thiết lập một lộ trình học tập phù hợp với bạn.",
    lottieAsset: "lib/assets/animations/onboarding2.json",
  ),
];
