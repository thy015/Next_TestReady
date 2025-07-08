class User {
  final int id;
  final String fullname;
  final String email;
  final DateTime birthday;
  final String password;
  final bool isValid;
  final String phoneNumber;
  final DateTime createdAt;
  final DateTime updatedAt;
  final String? topupAmount;

  User({
    required this.id,
    required this.fullname,
    required this.email,
    required this.birthday,
    required this.password,
    required this.isValid,
    required this.phoneNumber,
    required this.createdAt,
    required this.updatedAt,
    this.topupAmount,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'],
      fullname: json['fullname'],
      email: json['email'],
      birthday: DateTime.parse(json['birthday']),
      password: json['password'],
      isValid: json['isValid'],
      phoneNumber: json['phone_number'],
      createdAt: DateTime.parse(json['created_at']),
      updatedAt: DateTime.parse(json['updated_at']),
      topupAmount: json['topup_amount'] == "" ? null : json['topup_amount'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'fullname': fullname,
      'email': email,
      'birthday': birthday.toIso8601String(),
      'password': password,
      'isValid': isValid,
      'phone_number': phoneNumber,
      'created_at': createdAt.toIso8601String(),
      'updated_at': updatedAt.toIso8601String(),
      'topup_amount': topupAmount ?? "",
    };
  }
}
