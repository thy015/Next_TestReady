import 'package:flutter/material.dart';

class DetailPaperHeader extends StatelessWidget {
  final bool isFavorited;
  final VoidCallback onFavoritePressed;
  final VoidCallback onEditPressed;
  final VoidCallback onBackPressed;

  const DetailPaperHeader({
    Key? key,
    required this.isFavorited,
    required this.onFavoritePressed,
    required this.onEditPressed,
    required this.onBackPressed,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          GestureDetector(
            onTap: onBackPressed,
            child: const Icon(Icons.arrow_back, size: 24, color: Colors.black),
          ),
          Row(
            children: [
              GestureDetector(
                onTap: onFavoritePressed,
                child: Icon(
                  isFavorited ? Icons.favorite : Icons.favorite_border,
                  size: 24,
                  color: isFavorited ? Colors.red : Colors.black,
                ),
              ),
              const SizedBox(width: 16),
              GestureDetector(
                onTap: onEditPressed,
                child: const Icon(Icons.edit, size: 24, color: Colors.black),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
