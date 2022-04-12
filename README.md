# File Sharing System using Node.js
File Sharing System with 1 hour long links / リンクで行う簡単なファイル共有サービス
https://file-sharing-system-aylee.herokuapp.com/

### Configuration
1. Front-End : HTML,CSS,Javascript
2. Back-End : Node.js
3. DB : MongoDB
4. Deployment : Heroku

### Why This Project?

私はネットフリックスのようなOTTサービスに関心があります。
インターネットだけ繋がっていれば、みたい画像をいつでも見ることができるからです。 
映画を見るたびにどうやって海外から家まで来られるのか？という疑問がありました。
この疑問を解決するため調べてみたどころ、
クラウドコンピューティング(Cloud Computing)という存在を知り、深く勉強したくなって、現在学校でこれに関連した授業を受講しています。 
教授が理論で教えてくださいますが、一度自分で作ると理解度が高くなると思いました。

それで、Drop-Boxみたいな簡単なファイル共有サービスを作ろうと決意しました。
小さい容量のファイルをデータベースに保存し、
それをリンクに置き換えて他人に共有できるサービスを開発することになりました。

### __今後の改善点__

(1) __Error Handling__

現在は、満了したリンクと住所が間違っているリンクに限ってエラーを処理しています。 
WEBサーイトの安定性のため、全体に範囲を拡大します。


(2) __Refactoring__

思いついたことは何でも書いて、ある時はとても汚かった。 後で確認した時、問題がありました。
* 変数名は、認識しやすいように統一する必要があります。
* コードを読みやすいように書く必要があります。

(3) 要求事項の作成

要求事項を繊細に作成する必要性を感じました。 
必要な機能を大きく作成しておいて、細かい部分は作成しなかったです。
その結果、開発にかかった時間が長くなりました。

