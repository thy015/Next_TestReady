import 'package:flutter/material.dart';
import 'package:mobile/data/models/newspaper_model.dart';
import 'package:mobile/widgets/article_content.dart';
import 'package:mobile/widgets/article_main_image.dart';
import 'package:mobile/widgets/detail_paper_header.dart';
import 'package:mobile/widgets/related_acticle_section.dart';

class DetailPaper extends StatefulWidget {
  final NewsArticle article;
  const DetailPaper({Key? key, required this.article}) : super(key: key);

  @override
  _DetailPaperState createState() => _DetailPaperState();
}

class _DetailPaperState extends State<DetailPaper> {
  bool isFavorited = false;

  void toggleFavorite() {
    setState(() {
      isFavorited = !isFavorited;
    });
  }

  void onEditPressed() {}

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: Column(
          children: [
            DetailPaperHeader(
              isFavorited: isFavorited,
              onFavoritePressed: toggleFavorite,
              onEditPressed: onEditPressed,
              onBackPressed: () => Navigator.pop(context),
            ),
            Expanded(
              child: SingleChildScrollView(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    ArticleMainImage(imageUrl: widget.article.img),
                    ArticleContent(article: widget.article),
                    RelatedArticlesSection(article: widget.article),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
