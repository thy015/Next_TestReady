class Word {
  final int id;
  final List<String> defs;
  final String vieDef;
  final String partOfSpeech;
  final String phonetic;
  final List<String> examples;
  final List<String> audios;
  final List<String> imgs;
  final DateTime createdAt;
  final DateTime updatedAt;

  Word({
    required this.id,
    required this.defs,
    required this.vieDef,
    required this.partOfSpeech,
    required this.phonetic,
    required this.examples,
    required this.audios,
    required this.imgs,
    required this.createdAt,
    required this.updatedAt,
  });

  factory Word.fromJson(Map<String, dynamic> json) {
    return Word(
      id: json['id'],
      defs: List<String>.from(json['defs']),
      vieDef: json['vie_def'],
      partOfSpeech: json['part_of_speech'],
      phonetic: json['phonetic'],
      examples: List<String>.from(json['examples']),
      audios: List<String>.from(json['audios']),
      imgs: List<String>.from(json['imgs']),
      createdAt: DateTime.parse(json['created_at']),
      updatedAt: DateTime.parse(json['updated_at']),
    );
  }

  Map<String, dynamic> toJson() => {
    'id': id,
    'defs': defs,
    'vie_def': vieDef,
    'part_of_speech': partOfSpeech,
    'phonetic': phonetic,
    'examples': examples,
    'audios': audios,
    'imgs': imgs,
    'created_at': createdAt.toIso8601String(),
    'updated_at': updatedAt.toIso8601String(),
  };
}
