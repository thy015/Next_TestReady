import 'package:flutter/material.dart';
import 'package:mobile/data/models/newspaper_model.dart';

class RelatedArticlesSection extends StatelessWidget {
  final NewsArticle article;

  const RelatedArticlesSection({Key? key, required this.article})
    : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const RelatedArticlesTitle(),
          const SizedBox(height: 16),
          ...List.generate(3, (_) => RelatedArticleItem(article: article)),
        ],
      ),
    );
  }
}

class RelatedArticlesTitle extends StatelessWidget {
  const RelatedArticlesTitle({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return const Text(
      'Các bài báo liên quan',
      style: TextStyle(
        fontSize: 20,
        fontWeight: FontWeight.bold,
        color: Color(0xFF2196F3),
      ),
    );
  }
}

class RelatedArticleItem extends StatelessWidget {
  final NewsArticle article;

  const RelatedArticleItem({Key? key, required this.article}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          RelatedArticleImage(imageUrl: article.img),
          const SizedBox(width: 12),
          Expanded(
            child: RelatedArticleInfo(
              title: article.title,
              author: article.author,
            ),
          ),
        ],
      ),
    );
  }
}

class RelatedArticleImage extends StatelessWidget {
  final String imageUrl;

  const RelatedArticleImage({Key? key, required this.imageUrl})
    : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        Container(
          width: 100,
          height: 80,
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(8),
            color: Colors.grey[300],
          ),
          child: ClipRRect(
            borderRadius: BorderRadius.circular(8),
            child: Image.network(
              imageUrl,
              width: 100,
              height: 80,
              fit: BoxFit.cover,
              errorBuilder: (context, error, stackTrace) {
                return Container(
                  color: Colors.grey[300],
                  child: Center(
                    child: Icon(
                      Icons.newspaper,
                      size: 30,
                      color: Colors.grey[600],
                    ),
                  ),
                );
              },
            ),
          ),
        ),
        const Positioned(
          bottom: 6,
          left: 6,
          child: TimeStampBadge(timeText: '22 giờ trước'),
        ),
      ],
    );
  }
}

class TimeStampBadge extends StatelessWidget {
  final String timeText;

  const TimeStampBadge({Key? key, required this.timeText}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: const Color(0xFF2196F3),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Text(
        timeText,
        style: const TextStyle(
          color: Colors.white,
          fontSize: 10,
          fontWeight: FontWeight.w500,
        ),
      ),
    );
  }
}

class RelatedArticleInfo extends StatelessWidget {
  final String title;
  final String author;

  const RelatedArticleInfo({
    Key? key,
    required this.title,
    required this.author,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title,
          style: const TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.w600,
            color: Colors.black,
            height: 1.3,
          ),
          maxLines: 2,
          overflow: TextOverflow.ellipsis,
        ),
        const SizedBox(height: 8),
        Row(
          children: [
            const Text(
              'Tác giả: ',
              style: TextStyle(
                fontSize: 12,
                color: Colors.green,
                fontWeight: FontWeight.w500,
              ),
            ),
            Text(
              author,
              style: const TextStyle(
                fontSize: 12,
                color: Colors.black,
                fontWeight: FontWeight.w500,
              ),
            ),
          ],
        ),
      ],
    );
  }
}
