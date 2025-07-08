class NewsArticle {
  final int id;
  final String title;
  final String description;
  final String category;
  final String costType;
  final int cost;
  final String content;
  final String img;
  final String audio;
  final String author;
  final String? translation;
  final DateTime createdAt;
  final DateTime updatedAt;

  NewsArticle({
    required this.id,
    required this.title,
    required this.description,
    required this.category,
    required this.costType,
    required this.cost,
    required this.content,
    required this.img,
    required this.audio,
    required this.author,
    this.translation,
    required this.createdAt,
    required this.updatedAt,
  });

  factory NewsArticle.fromJson(Map<String, dynamic> json) {
    return NewsArticle(
      id: json['id'],
      title: json['title'],
      description: json['description'],
      category: json['category'],
      costType: json['cost_type'],
      cost: json['cost'],
      content: json['content'],
      img: json['img'],
      audio: json['audio'],
      author: json['author'],
      translation: json['translation'],
      createdAt: DateTime.parse(json['created_at']),
      updatedAt: DateTime.parse(json['updated_at']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'title': title,
      'description': description,
      'category': category,
      'cost_type': costType,
      'cost': cost,
      'content': content,
      'img': img,
      'audio': audio,
      'author': author,
      'translation': translation,
      'created_at': createdAt.toIso8601String(),
      'updated_at': updatedAt.toIso8601String(),
    };
  }
}
