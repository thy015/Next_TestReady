import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:mobile/screens/login_signup/login_screen.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'screens/onboarding/onboarding_screen.dart';
import 'screens/main_screen.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_stripe/flutter_stripe.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setSystemUIOverlayStyle(
    const SystemUiOverlayStyle(statusBarIconBrightness: Brightness.dark),
  );
  Stripe.publishableKey =
      'pk_test_51PxVYpBpaG5M20JqaEKs61B2tyiN26PKsoA93cNOX1ujUxNgnkygGACHpuNiKJFC3N4uXJDb9DNnkyi0C7aHGY5200dD34FrRs';
  runApp(const ProviderScope(child: MyApp()));
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  Future<Widget> decideStartScreen() async {
    final prefs = await SharedPreferences.getInstance();
    final seenOnboarding = prefs.getBool('seenOnboarding') ?? false;
    final token = prefs.getString('token');

    if (!seenOnboarding) {
      return const OnboardingScreen();
    } else {
      if (token != null && token.isNotEmpty) {
        return const MainScreen();
      } else {
        return const LoginScreen();
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData.light(),
      home: FutureBuilder<Widget>(
        future: decideStartScreen(),
        builder: (context, snapshot) {
          if (!snapshot.hasData) {
            return const Scaffold(
              body: Center(child: CircularProgressIndicator()),
            );
          }
          return snapshot.data!;
        },
      ),
    );
  }
}
