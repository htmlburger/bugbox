import archivoNarrowBoldEot from './fonts/archivonarrow-bold-webfont.eot'
import archivoNarrowBoldWoff from './fonts/archivonarrow-bold-webfont.woff'
import archivoNarrowBoldTtf from './fonts/archivonarrow-bold-webfont.ttf'
import archivoNarrowBoldSvg from './fonts/archivonarrow-bold-webfont.svg'
import archivoNarrowBolditalicEot from './fonts/archivonarrow-bolditalic-webfont.eot'
import archivoNarrowBolditalicWoff from './fonts/archivonarrow-bolditalic-webfont.woff'
import archivoNarrowBolditalicTtf from './fonts/archivonarrow-bolditalic-webfont.ttf'
import archivoNarrowBolditalicSvg from './fonts/archivonarrow-bolditalic-webfont.svg'
import archivoNarrowItalicEot from './fonts/archivonarrow-italic-webfont.eot'
import archivoNarrowItalicWoff from './fonts/archivonarrow-italic-webfont.woff'
import archivoNarrowItalicTtf from './fonts/archivonarrow-italic-webfont.ttf'
import archivoNarrowItalicSvg from './fonts/archivonarrow-italic-webfont.svg'
import archivoNarrowRegularEot from './fonts/archivonarrow-regular-webfont.eot'
import archivoNarrowRegularWoff from './fonts/archivonarrow-regular-webfont.woff'
import archivoNarrowRegularTtf from './fonts/archivonarrow-regular-webfont.ttf'
import archivoNarrowRegularSvg from './fonts/archivonarrow-regular-webfont.svg'
import archivoBoldEot from './fonts/archivo-bold-webfont.eot'
import archivoBoldWoff from './fonts/archivo-bold-webfont.woff'
import archivoBoldTtf from './fonts/archivo-bold-webfont.ttf'
import archivoBoldSvg from './fonts/archivo-bold-webfont.svg'
import archivoBolditalicEot from './fonts/archivo-bolditalic-webfont.eot'
import archivoBolditalicWoff from './fonts/archivo-bolditalic-webfont.woff'
import archivoBolditalicTtf from './fonts/archivo-bolditalic-webfont.ttf'
import archivoBolditalicSvg from './fonts/archivo-bolditalic-webfont.svg'
import archivoItalicEot from './fonts/archivo-italic-webfont.eot'
import archivoItalicWoff from './fonts/archivo-italic-webfont.woff'
import archivoItalicTtf from './fonts/archivo-italic-webfont.ttf'
import archivoItalicSvg from './fonts/archivo-italic-webfont.svg'
import archivoRegularEot from './fonts/archivo-regular-webfont.eot'
import archivoRegularWoff from './fonts/archivo-regular-webfont.woff'
import archivoRegularTtf from './fonts/archivo-regular-webfont.ttf'
import archivoRegularSvg from './fonts/archivo-regular-webfont.svg'

export default `
/* ------------------------------------------------------------ *\
	Fonts
\* ------------------------------------------------------------ */

@font-face {
	font-family: 'Archivo Narrow';
	src: url(${archivoNarrowBoldEot});
	src: url(${archivoNarrowBoldEot}?#iefix) format('embedded-opentype'),
		 url(${archivoNarrowBoldWoff}) format('woff'),
		 url(${archivoNarrowBoldTtf}) format('truetype'),
		 url(${archivoNarrowBoldSvg}#archivo_narrowbold) format('svg');
	font-weight: bold;
	font-style: normal;
}

@font-face {
	font-family: 'Archivo Narrow';
	src: url(${archivoNarrowBolditalicEot});
	src: url(${archivoNarrowBolditalicEot}?#iefix) format('embedded-opentype'),
		 url(${archivoNarrowBolditalicWoff}) format('woff'),
		 url(${archivoNarrowBolditalicTtf}) format('truetype'),
		 url(${archivoNarrowBolditalicSvg}#archivo_narrowbold_italic) format('svg');
	font-weight: bold;
	font-style: italic;
}

@font-face {
	font-family: 'Archivo Narrow';
	src: url(${archivoNarrowItalicEot});
	src: url(${archivoNarrowItalicEot}?#iefix) format('embedded-opentype'),
		 url(${archivoNarrowItalicWoff}) format('woff'),
		 url(${archivoNarrowItalicTtf}) format('truetype'),
		 url(${archivoNarrowItalicSvg}#archivo_narrowitalic) format('svg');
	font-weight: normal;
	font-style: italic;
}

@font-face {
	font-family: 'Archivo Narrow';
	src: url(${archivoNarrowRegularEot});
	src: url(${archivoNarrowRegularEot}?#iefix) format('embedded-opentype'),
		 url(${archivoNarrowRegularWoff}) format('woff'),
		 url(${archivoNarrowRegularTtf}) format('truetype'),
		 url(${archivoNarrowRegularSvg}#archivo_narrowregular) format('svg');
	font-weight: normal;
	font-style: normal;
}

@font-face {
	font-family: 'Archivo';
	src: url(${archivoBoldEot});
	src: url(${archivoBoldEot}?#iefix) format('embedded-opentype'),
		 url(${archivoBoldWoff}) format('woff'),
		 url(${archivoBoldTtf}) format('truetype'),
		 url(${archivoBoldSvg}#archivobold) format('svg');
	font-weight: bold;
	font-style: normal;
}

@font-face {
	font-family: 'Archivo';
	src: url(${archivoBolditalicEot});
	src: url(${archivoBolditalicEot}?#iefix) format('embedded-opentype'),
		 url(${archivoBolditalicWoff}) format('woff'),
		 url(${archivoBolditalicTtf}) format('truetype'),
		 url(${archivoBolditalicSvg}#archivobold_italic) format('svg');
	font-weight: bold;
	font-style: italic;
}

@font-face {
	font-family: 'Archivo';
	src: url(${archivoItalicEot});
	src: url(${archivoItalicEot}?#iefix) format('embedded-opentype'),
		 url(${archivoItalicWoff}) format('woff'),
		 url(${archivoItalicTtf}) format('truetype'),
		 url(${archivoItalicSvg}#archivoitalic) format('svg');
	font-weight: normal;
	font-style: italic;
}

@font-face {
	font-family: 'Archivo';
	src: url(${archivoRegularEot});
	src: url(${archivoRegularEot}?#iefix) format('embedded-opentype'),
		 url(${archivoRegularWoff}) format('woff'),
		 url(${archivoRegularTtf}) format('truetype'),
		 url(${archivoRegularSvg}#archivoregular) format('svg');
	font-weight: normal;
	font-style: normal;
}


/* ------------------------------------------------------------ *\
	Base
\* ------------------------------------------------------------ */

*,
*:before,
*:after { margin: 0; padding: 0; outline: 0; box-sizing: border-box; }

body { font-family: 'Archivo', Arial, sans-serif; font-size: 14px; color: #585858; line-height: 1.2; overflow: hidden; }

img { display: inline-block; vertical-align: middle; max-width: 100%; height: auto; }

p { margin-bottom: 1.2em; }
p:last-child { margin-bottom: 0; }

a { color: #03a9f4; text-decoration: none; }
a:hover { text-decoration: underline; }

h1 { font-size: 24px; }
h2 { font-size: 20px; }
h3 { font-size: 18px; }
h4 { font-size: 16px; }
h5 { font-size: 14px; }
h6 { font-size: 12px; }

h1,
h2,
h3,
h4,
h5,
h6 { font-weight: normal; }

::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: #fff; }
::-webkit-scrollbar-thumb { border-radius: 3px; background: #ff6363; border: 1px solid #fff; }

/* ------------------------------------------------------------ *\
	Animations
\* ------------------------------------------------------------ */

@keyframes loadingDot {
	0%  { transform: translateY(0); }
	35% { transform: translateY(0); background: #888; opacity: .3; }
	50% { transform: translateY(-83.33%); background: #ff6363; opacity: 1; }
	70% { transform: translateY(33.33%); background: #888; opacity: .3; }
	85% { transform: translateY(0); }
}

/* ------------------------------------------------------------ *\
	Transitions
\* ------------------------------------------------------------ */

.fade-enter-active,
.fade-leave-active { transition: opacity .2s; }

.fade-enter,
.fade-leave-to { opacity: 0; }

.fade-left-enter-active,
.fade-left-leave-active { transition: opacity .2s, transform .2s; }

.fade-left-enter { transform: translateX(10%); opacity: 0; }
.fade-left-leave-to { transform: translateX(-10%); opacity: 0; }

/* ------------------------------------------------------------ *\
	Buttons
\* ------------------------------------------------------------ */

.btn { display: inline-block; vertical-align: middle; padding: 12px 14px; background: #ff6363; border: 0; border-radius: 5px; color: #fff; text-decoration: none; text-transform: uppercase; font-family: 'Archivo Narrow', 'Archivo', Arial, sans-serif; font-weight: bold; font-size: 14px; text-align: center; cursor: pointer; transition: all .2s; }
.btn:hover { background: #f05d5d; text-decoration: none; }

.btn--full { width: 100%; }

.btn--cancel { color: #888; background: #f0f2f2; }
.btn--cancel:hover { background: #e3e4e4; }

/* ------------------------------------------------------------ *\
	Cols
\* ------------------------------------------------------------ */

.cols { margin: 0 -6px; }
.cols:after { content: ''; display: table; clear: both; line-height: 0; }

.col { float: left; width: 100%; padding: 0 6px; }
.col--1of2 { width: 50%; }

@media (max-width: 499px) {
	.col { width: 100%; }
	.col + .col { margin-top: 8px; }
}

/* ------------------------------------------------------------ *\
	Loader
\* ------------------------------------------------------------ */

.loader { position: absolute; z-index: 100; left: 50%; top: 50%; transform: translate(-50%, -50%); font-size: 0; }

.loader .loader__dot { display: inline-block; vertical-align: top; width: 6px; height: 6px; background: #888; border-radius: 50%; animation: loadingDot 1.5s infinite; }
.loader .loader__dot + .loader__dot { margin-left: 4px; }

.loader .loader__dot:nth-child(2) { animation-delay: .15s; }
.loader .loader__dot:nth-child(3) { animation-delay: .3s; }


/* ------------------------------------------------------------ *\
	Form Elements
\* ------------------------------------------------------------ */

.field { width: 100%; height: 40px; padding: 0 15px; background: #f4f4f4; border: 1px solid #d3d4d5; border-radius: 5px; font-size: 12px; font-family: inherit; box-shadow: 0 1px 0 0 #d3d4d5; color: #666666; transition: background .2s; }

.textarea { width: 100%; padding: 12px 15px; background: #f4f4f4; border: 1px solid #d3d4d5; border-radius: 5px; font-size: 12px; font-family: inherit; box-shadow: 0 1px 0 0 #d3d4d5; color: #666666; transition: background .2s; }

.field:focus,
.textarea:focus { background: #fff; }

.select { position: relative; }
.select select { width: 100%; height: 40px; padding: 0 15px; background: #f4f4f4; border: 1px solid #d3d4d5; border-radius: 5px; box-shadow: 0 1px 0 0 #d3d4d5; font-size: 12px; font-family: inherit; color: #666666; }

.file { position: relative; }
.file input { position: absolute; left: 0; top: 0; width: 100%; height: 100%; opacity: 0; }
.file input:hover + .btn { background: #0391cd; }

.radio { position: relative; display: block; padding-left: 18px; }

.radio .radio__input { position: absolute; left: -10000px; }

.radio .radio__label { display: block; padding: 6px 0; font-size: 12px; color: #666666; word-break: break-all; user-select: none; cursor: pointer; }
.radio .radio__label:before { content: ''; position: absolute; left: 0; top: .6em; width: 12px; height: 12px; background: #f4f4f4; border-radius: 50%; border: 2px solid #d3d4d5; transition: all .2s ease-out; }

.radio .radio__input:checked + .radio__label:before { border-color: #f05d5d; }

/* ------------------------------------------------------------ *\
	Form
\* ------------------------------------------------------------ */

.form { padding: 16px; }

.form form { transition: all .2s; }

.form .form__head { position: relative; padding: 4px 0; height: 30px; margin-bottom: 4px; cursor: move; }

.form .form__close { position: absolute; right: 0; top: 0; width: 20px; height: 20px; background: rgba(0,0,0,.05); border-radius: 2px; text-align: center; line-height: 20px; text-decoration: none; transition: all .2s; }
.form .form__close:hover { text-decoration: none; background: rgba(0,0,0,.1); }

.form .form__row { padding: 0 16px; margin: 0 -16px 16px; }
.form .form__row + .form__row { padding-top: 16px; border-top: 1px solid #ededed; }

.form .form__label { display: block; margin-bottom: 15px; color: #888; font-size: 12px; font-weight: bold; font-family: 'Archivo Narrow', 'Archivo', Arial, sans-serif; text-transform: uppercase; }

.form .form__preview { position: relative; width: 94px; height: 94px; border: 2px solid #ddd; }
.form .form__preview img { display: inline-block; vertical-align: middle; max-width: 100%; max-height: 100%; height: auto; width: auto; }

.form .form__preview-image { display: flex; align-items: center; justify-content: center; height: 100%; width: 100%; }

.form .form__preview-remove { position: absolute; right: 2px; top: 2px; width: 12px; height: 12px; background: rgba(0,0,0,.1); line-height: 12px; text-align: center; text-decoration: none; color: #f44336; transition: all .2s; }
.form .form__preview-remove:hover { background: none; }

.form .form__screenshot { display: flex; align-items: center; }

.form .form__screenshot .form__file { margin-left: 10px; }
.form .form__screenshot .form__preview { margin-right: 10px; }

/*  Form Loading  */

.form--loading { position: relative; }
.form--loading form { opacity: .5; pointer-events: none; }


/*  Form Issue  */

.form-issue { height: 100%; width: 100%; padding: 10px; }

.form-issue .form__inner { width: 100%; height: 100%; padding: 8px; background: #fff; border-radius: 2px; box-shadow: 0 2px 8px 0 rgba(0,0,0,.2); }

.form-issue .form__actions { height: 40px; padding-top: 8px; margin-top: 10px; border-top: 1px solid #eee; }

.form-issue .form__body { height: calc(100% - 90px); overflow: hidden; overflow-y: auto; }


/* ------------------------------------------------------------ *\
	Table
\* ------------------------------------------------------------ */

.table table { width: 100%; border: 1px solid #ddd; border-spacing: 0; }

.table th,
.table td { padding: 8px; border-bottom: 1px solid #ddd; font-size: 12px; text-align: left; }

.table th { width: 25%; font-weight: bold; border-right: 1px solid #f5f5f5; }

.table tr:last-child th,
.table tr:last-child td { border-bottom: 0; }

/* ------------------------------------------------------------ *\
	Panel
\* ------------------------------------------------------------ */

.panel { position: relative; height: 100%; min-width: 300px; margin-left: 35px; }

.panel .panel__inner { position: relative; z-index: 10; height: 100%; padding: 70px 0 60px; background: #fff; box-shadow: 0 10px 30px 0 rgba(0,0,0,.1); transition: all .2s; }

.panel .panel__toggle { position: absolute; right: 100%; bottom: 10px; width: 30px; height: 30px; line-height: 30px; background: #fff; border: 0; border-radius: 2px 0 0 2px; text-align: center; box-shadow: -2px 2px 3px 0 rgba(0,0,0,.1); cursor: pointer; transition: all .2s; }
.panel .panel__toggle:hover { background: #eee; text-decoration: none; }
.panel .panel__toggle img { transform: rotate(180deg); transition: all .2s; }

.panel .panel__quick-add { position: absolute; right: 100%; bottom: 50px; width: 30px; height: 30px; line-height: 30px; background: #fff; border: 0; border-radius: 2px 0 0 2px; text-align: center; box-shadow: -2px 2px 3px 0 rgba(0,0,0,.1); cursor: pointer; transform: translateX(100%); visibility: hidden; opacity: 0; transition: all .2s; }
.panel .panel__quick-add:hover { background: #eee; text-decoration: none; }
.panel .panel__quick-add img { width: 20px; transition: all .2s; }

.panel .panel__head { position: absolute; z-index: 10; left: 0; top: 0; display: flex; align-items: center; width: 100%; height: 70px; padding: 15px; border-bottom: 1px solid #ededed; }
.panel .panel__body { max-height: 100%; overflow: hidden; overflow-y: auto; }

.panel .panel__dropdown { position: relative; margin-left: auto; }
.panel .panel__dropdown + .panel__dropdown { margin-left: 0; }

.panel .panel__dropdown-trigger { display: block; height: 34px; padding: 8px 12px; line-height: 34px; font-size: 0; line-height: 0; text-indent: -10000px; }

.panel .panel__dropdown-icon { display: block; width: 34px; height: 34px; padding: 5px; text-align: center; }
.panel .panel__dropdown-icon img { max-width: 22px; max-height: 22px; height: auto; }

.panel .panel__dropdown-dots { display: block; }
.panel .panel__dropdown-dots:before,
.panel .panel__dropdown-dots:after { content: ''; }

.panel .panel__dropdown-dots:before,
.panel .panel__dropdown-dots:after,
.panel .panel__dropdown-dots i { display: block; width: 4px; height: 4px; background: #ccc; border-radius: 50%; transition: all .2s; }

.panel .panel__dropdown-dots i { margin: 3px 0; }

.panel .panel__dropdown-menu { position: absolute; right: 0; top: 100%; width: 200px; background: #fff; border: 1px solid #ddd; border-radius: 2px; box-shadow: 0 4px 8px 0 rgba(0,0,0,.15); list-style: none outside none; overflow: hidden; visibility: hidden; opacity: 0; transition: all .2s; }
.panel .panel__dropdown-menu li { padding: 8px; border-bottom: 1px solid #eee; }
.panel .panel__dropdown-menu li:last-child { border-bottom: 0; }

.panel .panel__dropdown-menu--small { font-size: 12px; max-height: 200px; overflow-y: auto; }
.panel .panel__dropdown-menu--small li { padding: 4px 8px; }

.panel .panel__dropdown:hover .panel__dropdown-dots:before,
.panel .panel__dropdown:hover .panel__dropdown-dots:after,
.panel .panel__dropdown:hover .panel__dropdown-dots i { background: #03a9f4; }

.panel .panel__dropdown:hover .panel__dropdown-menu { visibility: visible; opacity: 1; }

.panel .panel__project-link { margin: 0 8px; }
.panel .panel__project-link img { width: 14px; margin-right: 4px; }

/*  Panel Collapsed  */
.panel--collapsed { box-shadow: none; }
.panel--collapsed .panel__toggle img { transform: none; }
.panel--collapsed .panel__quick-add { visibility: visible; opacity: 1; transform: translateX(0); }


/* ------------------------------------------------------------ *\
	Authorize
\* ------------------------------------------------------------ */

.authorize { display: flex; height: 100%; height: calc(100% + 130px); margin-top: -70px; align-items: center; font-family: 'Archivo Narrow', 'Archivo', Arial, sans-serif; font-size: 20px; overflow-y: auto; }

.authorize img { margin-bottom: 25px; }
.authorize p { margin-bottom: 15px; }

.authorize .authorize__inner { flex: 1 1 auto; padding: 15px; text-align: center; }


/* ------------------------------------------------------------ *\
	User
\* ------------------------------------------------------------ */

.user .user__name { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.user .user__name img { display: inline-block; vertical-align: middle; width: 24px; height: 24px; border-radius: 2px; margin-right: 2px; }


/* ------------------------------------------------------------ *\
	Issues
\* ------------------------------------------------------------ */

.issues .issues__message { padding: 12px 8px; text-align: center; font-style: italic; opacity: .5; }
.issues .issues__holder { transition: all .2s; }


/* ------------------------------------------------------------ *\
	Filters
\* ------------------------------------------------------------ */

.filters { position: relative; z-index: 5; background: #f5f5f5; border-bottom: 1px solid #ddd; box-shadow: 0 2px 3px 0 rgba(0,0,0,.1); }

.filters .filters__section { padding: 4px 8px; }
.filters .filters__section + .filters__section { border-top: 1px solid #ddd; }

.filters .filters__section-title { margin-bottom: 2px; font-weight: bold; font-size: 12px; }
.filters .filters__count { text-align: center; font-size: 11px; }


/* ------------------------------------------------------------ *\
	Issue
\* ------------------------------------------------------------ */

.issue { position: relative; padding: 8px; margin-bottom: 2px; background: #f4f4f4; font-size: 13px; cursor: pointer; transition: all .2s; }
.issue:last-child { margin-bottom: 0; }

.issue:hover { background: #eeeeee; }

.issue .issue__inner { position: relative; padding-left: 20px; }

.issue .issue__link { position: absolute; left: 1px; top: 1px; width: 14px; }

.issue .issue__title { font-size: 1em; font-weight: normal; word-break: break-all; }

.issue .issue__meta { margin-top: 4px; font-size: .9em; opacity: .5; list-style: none outside none; font-size: 0; }
.issue .issue__meta li { display: inline-block; vertical-align: middle; font-size: 12px; line-height: 1; }
.issue .issue__meta li + li { border-left: 1px solid #ddd; padding-left: 6px; margin-left: 6px; }

.issue .issue__meta span { display: inline-block; vertical-align: top; }
.issue .issue__meta img { display: inline-block; vertical-align: top; width: 12px; height: auto; }

.issue .issue__badge { margin: -2px 2px 0 0; line-height: 1; font-size: 10px; }


/* ------------------------------------------------------------ *\
	Issue Details
\* ------------------------------------------------------------ */

.issue-details .issue__back { display: block; padding: 12px 8px; background: #eee; border-bottom: 1px solid #ddd; color: #555; text-decoration: none; transition: all .2s; }
.issue-details .issue__back:hover { background: #fff; }

.issue-details .issue__inner { padding: 12px 8px; }

.issue-details .issue__section { margin: 0 -8px; padding: 12px 8px; border-top: 1px solid #e5e5e5; box-shadow: inset 0 1px 2px rgba(0,0,0,.05); }
.issue-details .issue__section-title { display: block; margin-bottom: 15px; color: #888; font-size: 12px; font-weight: bold; font-family: 'Archivo Narrow', 'Archivo', Arial, sans-serif; text-transform: uppercase; }

.issue-details .issue__badge { margin-top: -4px; }

.issue-details .issue__title { padding: 4px 0; margin-bottom: 8px; font-size: 16px; word-break: break-all; }

.issue-details .issue__comments { display: inline-block; vertical-align: middle; padding: 2px 4px; margin-top: -4px; background: #eee; border-radius: 2px; font-size: 12px; color: #888; }
.issue-details .issue__comments img { display: inline-block; vertical-align: middle; width: 12px; margin: -2px 2px 0 0; }

.issue-details .issue__meta { margin-bottom: 10px; }

.issue-details .issue__link img { display: inline-block; vertical-align: middle; width: 14px; margin-right: 5px; }

.issue-details .issue__screenshots { margin-bottom: 12px; }

.issue-details .issue__screenshots strong { display: block; margin-bottom: 4px; }
.issue-details .issue__screenshots ul { list-style: none outside none; }
.issue-details .issue__screenshots li { display: inline-block; vertical-align: top; width: 70px; height: 50px; margin-right: 10px; border: 2px solid #ddd; transition: all .2s; }
.issue-details .issue__screenshots li:hover { border-color: #ccc; }
.issue-details .issue__screenshots a { display: block; }
.issue-details .issue__screenshots img { width: 100%; height: auto; }

.issue-details .issue__log { position: relative; background: #eee; padding: 8px; margin-bottom: 4px; border-radius: 2px; font-size: 12px; line-height: 1; }
.issue-details .issue__log ul { height: 150px; overflow-y: auto; }
.issue-details .issue__log li { padding-bottom: 4px; border-bottom: 1px dotted #ccc; margin-bottom: 4px; }
.issue-details .issue__log li:last-child { margin-bottom: 0; }

/* ------------------------------------------------------------ *\
	Badge
\* ------------------------------------------------------------ */

.badge { display: inline-block; vertical-align: middle; padding: 3px 8px; background: #ccc; border-radius: 5px; font-size: 10px; color: #fff; font-weight: bold; }


/* ------------------------------------------------------------ *\
	Call to Action
\* ------------------------------------------------------------ */

.cta { padding: 12px 8px; }

/* ------------------------------------------------------------ *\
	Lists
\* ------------------------------------------------------------ */

/*  List Urls  */

.list-urls { list-style: none outside none; }

.list-urls .list-urls__custom .list-urls__custom-hidden { display: none; margin-left: -18px; }
.list-urls .list-urls__custom .radio__input:checked ~ .list-urls__custom-hidden { display: block; }


/* ------------------------------------------------------------ *\
	List Options
\* ------------------------------------------------------------ */

.list-options { list-style: none outside none; }
.list-options li { display: inline-block; vertical-align: top; margin-right: 10px; }

.list-options .radio { padding-left: 16px; }
.list-options .radio .radio__label { font-size: 12px; }
`;
