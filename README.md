#**assemble**

Gruntで動かせる静的HTML生成ツール。  
コンパイルすることでHTMLを生成することができる。  
Handlebarsを利用できる。

##**やりたかったこと**
・インクルードできる  
・分岐ができる  
・Gruntで常時監視したかった。  

##**install**

```npm install assemble --save-dev```


##**Gruntfile.js**

Gruntfile.jsにタスクを追加

```
assemble: {
	options: {
		//レイアウトテンプレートディレクトリ
		layoutdir: 'src/layout',
		//include用テンプレートディレクトリ
		partials: 'src/includes/**/*.hbs'
	},
	files: {
		//trueだと以下が有効になる。
		expand: true,
		//srcで指定しているコンテンツファイルのディレクトリ
		cwd: 'src/page',
		//cwdで指定しているコンテンツファイル
		src: ['**/*.hbs'],
		//遷移先ファイルパス
		dest: './'
	}
}

grunt.loadNpmTasks('assemble');
grunt.registerTask('default', ['assemble']);
```


##**Example**

###**includeさせる**


{{> body}}　と記述するとsrcで設定したコンテンツファイルを読み込むことができる。  
{{> xxxx}}　と記述するとpartialsで設定したパーツを読み込むことができる。

**layout.hbs**

```
<!DOCTYPE HTML>
<html lang="ja">
<head>
	<meta charset="utf-8" />
	<title>{{title}}</title>
</head>
<body>
	{{>header}} →header.hbsを読み込む

	{{> body}}　→コンテンツファイルを読み込む

	{{> footer}} →footer.hbsを読み込む

</body>
</html>
```


**page.hbs**

{{> body}}の中身

```
<div id="warpper">
	<h1>見出しH1</h1>
	<div id="contents">
	{{>parts}}  →parts.hbsを読み込む
	</div>
</div>
```

**parts.hbs**

```
<div>aaaaaaaaa</div>
```

***

###**YAML**
YAMLで記述しておくとページ別の設定ができる。
ページ上部に設定を記述しておく

**page.hbs**

```
---
title: 'ページタイトル'
styles: ['common','page']
page-type: 'detail'
nav-menu: ０
parts: true
---
```


.hbs

```
---
title: 'ページタイトル'
---
<title>{{title}}</title>
```

.html

```
<title>ページタイトル</title>
```

***
.hbs

```
---
styles: ['common','page']
---
{{#styles}}
<link rel="stylesheet" href="css/{{.}}.css" />
{{/styles}}
```

.html

```
<link rel="stylesheet" href="css/common.css" />
<link rel="stylesheet" href="css/page.css" />
```

***
###**分岐させる**

.hbs

```
---
page-type: 'detail'
---
{{#is page-type "detail"}}
	<p>page-type detailだったら表示する内容</p>
{{else}}
	<p>page-type detail以外だったら表示する内容</p>
{{/is}}
```

.html

```
<p>page-type detailだったら表示する内容</p>
```

***

.hbs

```
---
nav-menu: ０
---
<a href="#"{{#is nav-menu 0}} class="on"{{/is}}><span>menu1</span></a>
<a href="#"{{#is nav-menu 1}} class="on"{{/is}}><span>menu1</span></a>
```

.html

```
<a href="#" class="on"><span>menu0</span></a>
<a href="#"><span>menu1</span></a>
```

***

.hbs

```
---
parts: true
---
{{#if parts}}
	<div>aaaaaaaaa</div>
{{/if}}
```

.html

```
<div>aaaaaaaaa</div>
```

***
###**ループ**

