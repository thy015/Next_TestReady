class WordModel {
  final int id;
  final String word;
  final List<String> def;
  final String vieDef;
  final String partOfSpeech;
  final String phonetic;
  final List<String> examples;
  final List<String> audios;
  final List<String> imgs;
  final String createdAt;
  final String updatedAt;
  final int topicId;

  WordModel({
    required this.id,
    required this.word,
    required this.def,
    required this.vieDef,
    required this.partOfSpeech,
    required this.phonetic,
    required this.examples,
    required this.audios,
    required this.imgs,
    required this.createdAt,
    required this.updatedAt,
    required this.topicId,
  });

  factory WordModel.fromJson(Map<String, dynamic> json) {
    return WordModel(
      id: int.parse(json['id'].toString()),
      word: json['word'],
      def: List<String>.from(json['def'] ?? []),
      vieDef: json['vie_def'] ?? '',
      partOfSpeech: json['part_of_speech'] ?? '',
      phonetic: json['phonetic'] ?? '',
      examples: List<String>.from(json['examples'] ?? []),
      audios: List<String>.from(json['audios'] ?? []),
      imgs: List<String>.from(json['imgs'] ?? []),
      createdAt: json['created_at'] ?? '',
      updatedAt: json['updated_at'] ?? '',
      topicId: json['topic']?['id'] ?? 0,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'word': word,
      'def': def,
      'vie_def': vieDef,
      'part_of_speech': partOfSpeech,
      'phonetic': phonetic,
      'examples': examples,
      'audios': audios,
      'imgs': imgs,
      'created_at': createdAt,
      'updated_at': updatedAt,
      'topic_id': topicId,
    };
  }
}
