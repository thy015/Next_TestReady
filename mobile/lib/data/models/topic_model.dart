class Topic {
  final int id;
  final String name;
  final String category;
  final DateTime createdAt;
  final DateTime updatedAt;

  Topic({
    required this.id,
    required this.name,
    required this.category,
    required this.createdAt,
    required this.updatedAt,
  });

  factory Topic.fromJson(Map<String, dynamic> json) {
    return Topic(
      id: json['id'],
      name: json['name'],
      category: json['category'],
      createdAt: DateTime.parse(json['created_at']),
      updatedAt: DateTime.parse(json['updated_at']),
    );
  }

  Map<String, dynamic> toJson() => {
    'id': id,
    'name': name,
    'category': category,
    'created_at': createdAt.toIso8601String(),
    'updated_at': updatedAt.toIso8601String(),
  };
}
