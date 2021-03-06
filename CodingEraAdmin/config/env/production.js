'use strict';

module.exports = {
	log: {
		// Can specify one of 'combined', 'common', 'dev', 'short', 'tiny'
		format: 'combined',
		// Stream defaults to process.stdout
		// Uncomment to enable logging to a log on the file system
		options: {
			stream: 'access.log'
		}
	},
	assets: {
		lib: {
			css: [
				'public/components/bootstrap/dist/css/bootstrap.min.css',
				'public/components/angular-ui-grid/ui-grid.min.css',
				'public/components/google-code-prettify/bin/prettify.min.css',
				'public/components/animate.css/animate.min.css',
				'public/components/bootstrap-wysiwyg/index.min.css',
				'public/components/codemirror/lib/codemirror.css',
				'public/components/ui-select/dist/select.min.css',
				'public/components/ng-img-crop/compile/minified/ng-img-crop.css',
				'public/components/slickgrid/slick.grid.css'
			],
			js: [
				'public/components/angular/angular.min.js',
				'public/components/angular-i18n/angular-locale_zh-cn.js',
				'public/components/angular-resource/angular-resource.min.js',
				'public/components/angular-animate/angular-animate.min.js',
				'public/components/angular-ui-router/release/angular-ui-router.min.js',
				'public/components/angular-ui-utils/ui-utils.min.js',
				'public/components/angular-bootstrap/ui-bootstrap-tpls.min.js',
				'public/components/angular-sanitize/angular-sanitize.min.js',
				'public/components/angular-cookies/angular-cookies.min.js',
				'public/components/lodash/dist/lodash.min.js',
				'public/components/ng-file-upload/ng-file-upload.min.js',
				'public/components/ng-img-crop/compile/minified/ng-img-crop.js',
				'public/components/ui-select/dist/select.min.js',
				'public/components/moment/min/moment.min.js',
				'public/components/marked/lib/marked.js',
				'public/components/codemirror/lib/codemirror.js',
				'public/components/angular-marked/dist/angular-marked.min.js',
				'public/components/jquery/dist/jquery.min.js',
				'public/components/slickgrid/lib/jquery.event.drag-2.2.js',
				'public/components/slickgrid/slick.core.js',
				'public/components/slickgrid/slick.grid.js',
				'public/components/angular-validation/dist/angular-validation.min.js',
				'public/components/angular-validation/dist/angular-validation-rule.min.js',
			]
		},
		css: ['public/dist/css/all.min.css'],
		js: ['public/dist/js/all.js'],
		open:{
			css: ['public/dist/css/all.min.css'],
			js: ['public/dist/js/all.js']
		},
		tests: [
			'public/components/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js'
		],
		server: {
			gulpConfig: 'gulpfile.js',
			allJs: ['server.js', 'config/**/*.js', 'public/modules/*/*.js'],
			views: 'public/modules/**/*.html'
		}
	},
	app: {
		title: 'Coding Era Studio - 编码时代工作室'
	},
	github: {
		clientID: process.env.GITHUB_ID || 'eae6a961352846d592b3',
		clientSecret: process.env.GITHUB_SECRET || '0ec7bf264ff8a27b98a37c0915909442ad687c67',
		callbackURL: '/auth/github/callback'
	},
	codingera: {
		//prod
		apiURL: 'http://ws.codingera.com/api',
		authorizationURL: 'http://ws.codingera.com/oauth/authorize',
		tokenURL: 'http://ws.codingera.com/oauth/token',
		clientID: 'api-client',
		clientSecret: 'api',
		callbackURL: "http://admin.codingera.com/auth/provider/callback",
		userInfoURL:"http://ws.codingera.com/api/me",
		logoutURL:"http://ws.codingera.com/oauth/logout?next=http://admin.codingera.com"
	},
	mailer: {
		from: process.env.MAILER_FROM || '1132075350@qq.com',
		options: {
			host: "smtp.qq.com", // 主机
			secureConnection: true, // 使用 SSL
			port: 465, // SMTP 端口
			//service: process.env.MAILER_SERVICE_PROVIDER || 'MAILER_SERVICE_PROVIDER',
			auth: {
				user: process.env.MAILER_EMAIL_ID || '1132075350@qq.com',
				pass: process.env.MAILER_PASSWORD || 'bhfyixrydoodgfee'
			}
		}
	}
};
