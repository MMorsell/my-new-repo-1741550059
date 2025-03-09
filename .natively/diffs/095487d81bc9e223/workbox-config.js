--- 
+++ 
@@ -1,11 +1,11 @@
-module.exports = {
-	globDirectory: 'public/',
-	globPatterns: [
-		'**/*.{png,ico,svg,html,json}'
-	],
-	swDest: 'dist/sw.js',
-	ignoreURLParametersMatching: [
-		/^utm_/,
-		/^fbclid$/
-	]
+module.exports = {
+	globDirectory: 'public/',
+	globPatterns: [
+		'**/*.{png,ico,svg,html,json}'
+	],
+	swDest: 'dist/sw.js',
+	ignoreURLParametersMatching: [
+		/^utm_/,
+		/^fbclid$/
+	]
 };