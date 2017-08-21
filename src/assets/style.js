import archivoRegularEot from './fonts/archivo-v2-latin-regular.eot';
import archivoRegularWoff2 from './fonts/archivo-v2-latin-regular.woff2';
import archivoRegularWoff from './fonts/archivo-v2-latin-regular.woff';
import archivoRegularTtf from './fonts/archivo-v2-latin-regular.ttf';
import archivoRegularSvg from './fonts/archivo-v2-latin-regular.svg';
import archivoItalicEot from './fonts/archivo-v2-latin-italic.eot';
import archivoItalicWoff2 from './fonts/archivo-v2-latin-italic.woff2';
import archivoItalicWoff from './fonts/archivo-v2-latin-italic.woff';
import archivoItalicTtf from './fonts/archivo-v2-latin-italic.ttf';
import archivoItalicSvg from './fonts/archivo-v2-latin-italic.svg';
import archivoBoldEot from './fonts/archivo-v2-latin-700.eot';
import archivoBoldWoff2 from './fonts/archivo-v2-latin-700.woff2';
import archivoBoldWoff from './fonts/archivo-v2-latin-700.woff';
import archivoBoldTtf from './fonts/archivo-v2-latin-700.ttf';
import archivoBoldSvg from './fonts/archivo-v2-latin-700.svg';
import archivoBolditalicEot from './fonts/archivo-v2-latin-700italic.eot';
import archivoBolditalicWoff2 from './fonts/archivo-v2-latin-700italic.woff2';
import archivoBolditalicWoff from './fonts/archivo-v2-latin-700italic.woff';
import archivoBolditalicTtf from './fonts/archivo-v2-latin-700italic.ttf';
import archivoBolditalicSvg from './fonts/archivo-v2-latin-700italic.svg';
import archivoNarrowRegularEot from './fonts/archivo-narrow-v7-latin-regular.eot';
import archivoNarrowRegularWoff2 from './fonts/archivo-narrow-v7-latin-regular.woff2';
import archivoNarrowRegularWoff from './fonts/archivo-narrow-v7-latin-regular.woff';
import archivoNarrowRegularTtf from './fonts/archivo-narrow-v7-latin-regular.ttf';
import archivoNarrowRegularSvg from './fonts/archivo-narrow-v7-latin-regular.svg';
import archivoNarrowItalicEot from './fonts/archivo-narrow-v7-latin-italic.eot';
import archivoNarrowItalicWoff2 from './fonts/archivo-narrow-v7-latin-italic.woff2';
import archivoNarrowItalicWoff from './fonts/archivo-narrow-v7-latin-italic.woff';
import archivoNarrowItalicTtf from './fonts/archivo-narrow-v7-latin-italic.ttf';
import archivoNarrowItalicSvg from './fonts/archivo-narrow-v7-latin-italic.svg';
import archivoNarrowBolditalicEot from './fonts/archivo-narrow-v7-latin-700italic.eot';
import archivoNarrowBolditalicWoff2 from './fonts/archivo-narrow-v7-latin-700italic.woff2';
import archivoNarrowBolditalicWoff from './fonts/archivo-narrow-v7-latin-700italic.woff';
import archivoNarrowBolditalicTtf from './fonts/archivo-narrow-v7-latin-700italic.ttf';
import archivoNarrowBolditalicSvg from './fonts/archivo-narrow-v7-latin-700italic.svg';
import archivoNarrowBoldEot from './fonts/archivo-narrow-v7-latin-700.eot';
import archivoNarrowBoldWoff2 from './fonts/archivo-narrow-v7-latin-700.woff2';
import archivoNarrowBoldWoff from './fonts/archivo-narrow-v7-latin-700.woff';
import archivoNarrowBoldTtf from './fonts/archivo-narrow-v7-latin-700.ttf';
import archivoNarrowBoldSvg from './fonts/archivo-narrow-v7-latin-700.svg';

import icoTrello from './images/trello.svg';
import icoUsers from './images/users.svg';
import icoUsersHover from './images/users-hover.svg';
import icoDots from './images/dots.svg';
import icoDotsHover from './images/dots-hover.svg';
import icoLogout from './images/logout.svg';
import icoChange from './images/change.svg';
import icoAdd from './images/add.svg';
import icoLink from './images/external-link.svg';
import icoLinkWhite from './images/external-link-white.svg';
import icoFilter from './images/filter.svg';
import icoChevronUp from './images/chevron-up.svg';
import icoChevronDown from './images/chevron-down.svg';
import icoChevronLeft from './images/chevron-left.svg';
import icoChevronRight from './images/chevron-right.svg';
import icoComment from './images/comment.svg';
import icoHeart from './images/heart.svg';
import icoPin from './images/pin-default.svg';
import icoPinHighlighted from './images/pin-highlighted.svg';
import icoImage from './images/image.svg';

export default `
/* ------------------------------------------------------------ *\
	Fonts
\* ------------------------------------------------------------ */

@font-face {
	font-family: 'Archivo';
	font-style: normal;
	font-weight: 400;
	src: url(${archivoRegularEot});
	src: local('Archivo Regular'), local('Archivo-Regular'),
		 url(${archivoRegularEot}#iefix) format('embedded-opentype'),
		 url(${archivoRegularWoff2}) format('woff2'),
		 url(${archivoRegularWoff}) format('woff'),
		 url(${archivoRegularTtf}) format('truetype'),
		 url(${archivoRegularSvg}#Archivo) format('svg');
}

@font-face {
	font-family: 'Archivo';
	font-style: italic;
	font-weight: 400;
	src: url(${archivoItalicEot});
	src: local('Archivo Italic'), local('Archivo-Italic'),
		 url(${archivoItalicEot}#iefix) format('embedded-opentype'),
		 url(${archivoItalicWoff2}) format('woff2'),
		 url(${archivoItalicWoff}) format('woff'),
		 url(${archivoItalicTtf}) format('truetype'),
		 url(${archivoItalicSvg}#Archivo) format('svg');
}

@font-face {
	font-family: 'Archivo';
	font-style: normal;
	font-weight: 700;
	src: url(${archivoBoldEot});
	src: local('Archivo Bold'), local('Archivo-Bold'),
		 url(${archivoBoldEot}#iefix) format('embedded-opentype'),
		 url(${archivoBoldWoff2}) format('woff2'),
		 url(${archivoBoldWoff}) format('woff'),
		 url(${archivoBoldTtf}) format('truetype'),
		 url(${archivoBoldSvg}#Archivo) format('svg');
}

@font-face {
	font-family: 'Archivo';
	font-style: italic;
	font-weight: 700;
	src: url(${archivoBolditalicEot});
	src: local('Archivo Bold Italic'), local('Archivo-BoldItalic'),
		 url(${archivoBolditalicEot}#iefix) format('embedded-opentype'),
		 url(${archivoBolditalicWoff2}) format('woff2'),
		 url(${archivoBolditalicWoff}) format('woff'),
		 url(${archivoBolditalicTtf}) format('truetype'),
		 url(${archivoBolditalicSvg}#Archivo) format('svg');
}

@font-face {
	font-family: 'Archivo Narrow';
	font-style: normal;
	font-weight: 400;
	src: url(${archivoNarrowRegularEot});
	src: local('Archivo Narrow Regular'), local('ArchivoNarrow-Regular'),
		 url(${archivoNarrowRegularEot}#iefix) format('embedded-opentype'),
		 url(${archivoNarrowRegularWoff2}) format('woff2'),
		 url(${archivoNarrowRegularWoff}) format('woff'),
		 url(${archivoNarrowRegularTtf}) format('truetype'),
		 url(${archivoNarrowRegularSvg}#ArchivoNarrow) format('svg');
}

@font-face {
	font-family: 'Archivo Narrow';
	font-style: italic;
	font-weight: 400;
	src: url(${archivoNarrowItalicEot});
	src: local('Archivo Narrow Italic'), local('ArchivoNarrow-Italic'),
		 url(${archivoNarrowItalicEot}#iefix) format('embedded-opentype'),
		 url(${archivoNarrowItalicWoff2}) format('woff2'),
		 url(${archivoNarrowItalicWoff}) format('woff'),
		 url(${archivoNarrowItalicTtf}) format('truetype'),
		 url(${archivoNarrowItalicSvg}#ArchivoNarrow) format('svg');
}

@font-face {
	font-family: 'Archivo Narrow';
	font-style: italic;
	font-weight: 700;
	src: url(${archivoNarrowBolditalicEot});
	src: local('Archivo Narrow Bold Italic'), local('ArchivoNarrow-BoldItalic'),
		 url(${archivoNarrowBolditalicEot}#iefix) format('embedded-opentype'),
		 url(${archivoNarrowBolditalicWoff2}) format('woff2'),
		 url(${archivoNarrowBolditalicWoff}) format('woff'),
		 url(${archivoNarrowBolditalicTtf}) format('truetype'),
		 url(${archivoNarrowBolditalicSvg}#ArchivoNarrow) format('svg');
}

@font-face {
	font-family: 'Archivo Narrow';
	font-style: normal;
	font-weight: 700;
	src: url(${archivoNarrowBoldEot});
	src: local('Archivo Narrow Bold'), local('ArchivoNarrow-Bold'),
		 url(${archivoNarrowBoldEot}#iefix) format('embedded-opentype'),
		 url(${archivoNarrowBoldWoff2}) format('woff2'),
		 url(${archivoNarrowBoldWoff}) format('woff'),
		 url(${archivoNarrowBoldTtf}) format('truetype'),
		 url(${archivoNarrowBoldSvg}#ArchivoNarrow) format('svg');
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

a { color: #ff6363; text-decoration: none; }
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
	Icons
\* ------------------------------------------------------------ */

.ico-trello { display: inline-block; vertical-align: middle; width: 14px; height: 14px; background: url(${icoTrello}) no-repeat 0 0; background-size: 100% 100%; }
.ico-dots { display: inline-block; vertical-align: middle; width: 4px; height: 18px; background: url(${icoDots}) no-repeat 0 0; background-size: 100% 100%; }
.ico-dots-hover { display: inline-block; vertical-align: middle; width: 4px; height: 18px; background: url(${icoDotsHover}) no-repeat 0 0; background-size: 100% 100%; }
.ico-users { display: inline-block; vertical-align: middle; width: 17px; height: 12px; background: url(${icoUsers}) no-repeat 0 0; background-size: 100% 100%; }
.ico-users-hover { display: inline-block; vertical-align: middle; width: 17px; height: 12px; background: url(${icoUsersHover}) no-repeat 0 0; background-size: 100% 100%; }
.ico-logout { display: inline-block; vertical-align: middle; width: 16px; height: 16px; background: url(${icoLogout}) no-repeat 0 0; background-size: 100% 100%; }
.ico-change { display: inline-block; vertical-align: middle; width: 14px; height: 14px; background: url(${icoChange}) no-repeat 0 0; background-size: 100% 100%; }
.ico-add { display: inline-block; vertical-align: middle; width: 14px; height: 14px; background: url(${icoAdd}) no-repeat 0 0; background-size: 100% 100%; }
.ico-link { display: inline-block; vertical-align: middle; width: 15px; height: 13px; background: url(${icoLink}) no-repeat 0 0; background-size: 100% 100%; }
.ico-link-white { display: inline-block; vertical-align: middle; width: 15px; height: 13px; background: url(${icoLinkWhite}) no-repeat 0 0; background-size: 100% 100%; }
.ico-filter { display: inline-block; vertical-align: middle; width: 11px; height: 10px; background: url(${icoFilter}) no-repeat 0 0; background-size: 100% 100%; }
.ico-chevron-up { display: inline-block; vertical-align: middle; width: 11px; height: 7px; background: url(${icoChevronUp}) no-repeat 0 0; background-size: 100% 100%; }
.ico-chevron-down { display: inline-block; vertical-align: middle; width: 11px; height: 7px; background: url(${icoChevronDown}) no-repeat 0 0; background-size: 100% 100%; }
.ico-chevron-left { display: inline-block; vertical-align: middle; width: 7px; height: 11px; background: url(${icoChevronLeft}) no-repeat 0 0; background-size: 100% 100%; }
.ico-chevron-right { display: inline-block; vertical-align: middle; width: 7px; height: 11px; background: url(${icoChevronRight}) no-repeat 0 0; background-size: 100% 100%; }
.ico-comment { display: inline-block; vertical-align: middle; width: 9px; height: 8px; background: url(${icoComment}) no-repeat 0 0; background-size: 100% 100%; }
.ico-heart { display: inline-block; vertical-align: middle; width: 12px; height: 10px; background: url(${icoHeart}) no-repeat 0 0; background-size: 100% 100%; }
.ico-pin { display: inline-block; vertical-align: middle; width: 18px; height: 26px; background: url(${icoPin}) no-repeat 0 0; background-size: 100% 100%; }
.ico-pin-highlighted { display: inline-block; vertical-align: middle; width: 18px; height: 26px; background: url(${icoPinHighlighted}) no-repeat 0 0; background-size: 100% 100%; }
.ico-image { display: inline-block; vertical-align: middle; width: 20px; height: 16px; background: url(${icoImage}) no-repeat 0 0; background-size: 100% 100%; }

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

.field:not([readonly]):focus,
.textarea:focus { background: #fff; }

.select { position: relative; }
.select select { width: 100%; height: 40px; padding: 0 15px; background: #f4f4f4; border: 1px solid #d3d4d5; border-radius: 5px; box-shadow: 0 1px 0 0 #d3d4d5; font-size: 12px; font-family: inherit; color: #666666; }

.file { position: relative; }

.file .file__btn { position: absolute; left: 0; top: 0; display: flex; flex-flow: column; align-items: center; align-content: center; justify-content: center; width: 100%; height: 100%; padding: 10px 16px; border: 2px solid #d3d4d5; border-radius: 5px; font-family: 'Archivo Narrow', 'Archivo', Arial, sans-serif; font-weight: bold; font-size: 14px; text-align: center; text-transform: uppercase; }
.file .file__btn i { margin-bottom: 10px; }

.file input { position: absolute; z-index: 2; left: 0; top: 0; width: 100%; height: 100%; opacity: 0; }
.file input:hover + .file__btn { border-color: #0079be; color: #0079be; }

.radio { position: relative; display: block; padding-left: 18px; }

.radio .radio__input { position: absolute; left: -10000px; }

.radio .radio__label { display: block; padding: 6px 0; font-size: 12px; color: #666666; word-break: break-all; user-select: none; cursor: pointer; }
.radio .radio__label:before { content: ''; position: absolute; left: 0; top: .6em; width: 12px; height: 12px; background: #f4f4f4; border-radius: 50%; border: 2px solid #d3d4d5; transition: all .2s ease-out; }

.radio .radio__input:checked + .radio__label:before { border-color: #f05d5d; }

.custom-select { position: relative; }

.custom-select .custom-select__selected { position: relative; width: 100%; height: 40px; line-height: 40px; padding: 0 30px 0 15px; background: #ffffff; border: 0; border-radius: 5px; box-shadow: 0 2px 0 0 #d3d4d5; font-size: 12px; font-family: inherit; color: #666666; text-align: left; cursor: pointer; }
.custom-select .custom-select__selected:after { content: ''; position: absolute; right: 15px; top: 50%; width: 11px; height: 7px; margin: -4px; background: url(${icoChevronDown}) no-repeat 0 0; background-size: 100% 100%; opacity: .5; transition: all .2s; }

.custom-select .custom-select__options { position: absolute; z-index: 1000; left: 0; top: 100%; width: 100%; max-height: 300px; overflow-y: auto; background: #fff; border-radius: 0 0 5px 5px; box-shadow: 3px 4px 30px 0 rgba(0,0,0,.15); }
.custom-select .custom-select__options ul { list-style: none outside none; }
.custom-select .custom-select__options li { border-top: 1px solid #ededed; }
.custom-select .custom-select__options input { position: absolute; left: -4000px; }
.custom-select .custom-select__options label { display: block; padding: 12px 15px; color: #666666; font-size: 12px; font-family: inherit; cursor: pointer; user-select: none; transition: all .2s; }
.custom-select .custom-select__options label:hover { background: #f4f4f4; }

.custom-select--expanded .custom-select__selected { z-index: 1001; border-bottom-right-radius: 0; border-bottom-left-radius: 0; box-shadow: none; }
.custom-select--expanded .custom-select__selected:after { transform: rotate(180deg); }

/* ------------------------------------------------------------ *\
	Form
\* ------------------------------------------------------------ */

.form { padding: 16px; }

.form form { transition: all .2s; }

.form .form__head { position: relative; height: 50px; line-height: 49px; padding: 0 20px; border-bottom: 1px solid #e3e4e4; cursor: move; }

.form .form__title { padding-right: 25px; font-size: 16px; color: #888888; font-family: 'Archivo Narrow', 'Archivo', Arial, sans-serif; font-weight: bold; text-transform: uppercase; }

.form .form__close { position: absolute; right: 12px; top: 12px; width: 25px; height: 25px; background: #e3e4e4; border-radius: 5px; text-align: center; line-height: 23px; font-size: 20px; color: #8e8e8e; text-decoration: none; transition: all .2s; }
.form .form__close:hover { text-decoration: none; background: #f05d5d; color: #fff; }

.form .form__row { padding: 0 16px; margin: 0 -16px 16px; }
.form .form__row + .form__row { padding-top: 16px; border-top: 1px solid #ededed; }
.form .form__row > small { display: block; margin-top: 5px; }

.form .form__label { display: block; margin-bottom: 15px; color: #888; font-size: 12px; font-weight: bold; font-family: 'Archivo Narrow', 'Archivo', Arial, sans-serif; text-transform: uppercase; }

.form .form__preview { position: relative; width: 148px; height: 106px; border: 1px solid #d3d4d5; }
.form .form__preview img { display: inline-block; vertical-align: middle; max-width: 100%; max-height: 100%; height: auto; width: auto; }

.form .form__preview-image { display: flex; align-items: center; justify-content: center; height: 100%; width: 100%; }

.form .form__preview-remove { position: absolute; right: 2px; top: 2px; width: 12px; height: 12px; background: rgba(0,0,0,.1); line-height: 12px; text-align: center; text-decoration: none; color: #f44336; transition: all .2s; }
.form .form__preview-remove:hover { background: none; }

.form .form__screenshot { display: flex; align-items: stretch; justify-content: center; }

.form .form__screenshot .form__file { flex: 1 1 auto; margin-left: 15px; }

.form .form__btn { margin-right: 10px; }
.form .form__btn:last-child { margin-right: 0; }

/*  Form Loading  */

.form--loading { position: relative; }
.form--loading form { opacity: .5; pointer-events: none; }


/*  Form Issue  */

.form-issue { height: 100%; width: 100%; padding: 30px; }

.form-issue .form__inner { width: 100%; height: 100%; background: #fff; border-radius: 5px; box-shadow: 0 0 30px 0 rgba(0,0,0,.15); }

.form-issue .form__row { margin: 0; padding: 0; border: 0; }
.form-issue .form__row + .form__row { border: 0; padding: 0; margin-top: 20px; }

.form-issue .form__actions { height: 80px; font-size: 0; padding: 20px; border-top: 1px solid #e3e4e4; }

.form-issue .form__body { height: calc(100% - 130px); padding: 20px; overflow: hidden; overflow-y: auto; }


/* ------------------------------------------------------------ *\
	Table
\* ------------------------------------------------------------ */

.table { border: 1px solid #ddd; border-radius: 5px 0 5px 0; overflow: hidden; }
.table table { width: 100%; border: 0; border-spacing: 0; }

.table th,
.table td { padding: 10px 14px; border-bottom: 1px solid #e6e6e6; font-size: 12px; text-align: left; }

.table th { width: 25%; background: #fff; border-right: 1px solid #e6e6e6; font-weight: bold; }
.table td { background: #f4f4f4; }

.table tr:last-child th,
.table tr:last-child td { border-bottom: 0; }

/* ------------------------------------------------------------ *\
	Panel
\* ------------------------------------------------------------ */

.panel { position: relative; height: 100%; min-width: 300px; margin-left: 40px; }

.panel .panel__inner { position: relative; z-index: 10; height: 100%; padding: 70px 0 60px; background: #fff; box-shadow: 0 10px 30px 0 rgba(0,0,0,.1); transition: all .2s; }

.panel .panel__actions { position: absolute; right: 100%; bottom: 30px; width: 40px; }
.panel .panel__actions button { width: 40px; height: 40px; line-height: 40px; background: #f4f4f4; border: 0; cursor: pointer; transition: all .2s; }
.panel .panel__actions button:hover { background: #e15858; }
.panel .panel__actions button + button { margin-top: 2px; }

.panel .panel__actions button:first-child { border-top-left-radius: 5px; }
.panel .panel__actions button:last-child { border-bottom-left-radius: 5px; }

.panel .panel__toggle i { opacity: .5; transition: all .2s; }
.panel .panel__toggle:hover i { opacity: 1; filter: invert(1); }

.panel .panel__quick-add { visibility: hidden; opacity: 0; }
.panel .panel__quick-add span { position: relative; display: inline-block; vertical-align: middle; }
.panel .panel__quick-add i { transition: all .2s; }
.panel .panel__quick-add i + i { position: absolute; left: 0; top: 0; visibility: hidden; opacity: 0; }
.panel .panel__quick-add:hover i { visibility: hidden; opacity: 0; }
.panel .panel__quick-add:hover i + i { visibility: visible; opacity: 1; }

.panel .panel__head { position: absolute; z-index: 10; left: 0; top: 0; display: flex; align-items: center; width: 100%; height: 70px; padding: 15px; border-bottom: 1px solid #ededed; }
.panel .panel__body { height: 100%; overflow: hidden; overflow-y: auto; }

.panel .panel__dropdown { position: relative; margin-left: auto; }
.panel .panel__dropdown + .panel__dropdown { margin-left: 10px; }

.panel .panel__dropdown-btn { display: flex; align-items: center; height: 32px; line-height: 32px; padding: 0 5px; cursor: pointer; }

.panel .panel__dropdown-icon { position: relative; display: inline-block; }
.panel .panel__dropdown-icon i { transition: all .2s; }
.panel .panel__dropdown-icon i + i { position: absolute; left: 0; top: 0; visibility: hidden; opacity: 0; }

.panel .panel__dropdown-menu { position: absolute; right: 0; top: 100%; width: 220px; background: #fff; border-radius: 5px; box-shadow: 3px 4px 30px 0 rgba(0,0,0,.15); overflow: hidden; visibility: hidden; opacity: 0; font-size: 13px; line-height: 1.6; transition: all .2s; }
.panel .panel__dropdown-menu ul { list-style: none outside none; }
.panel .panel__dropdown-menu li { border-bottom: 1px solid #ededed; }
.panel .panel__dropdown-menu li:last-child { border-bottom: 0; }

.panel .panel__dropdown-menu li > a { display: block; padding: 10px 15px; color: #666666; transition: all .2s; }
.panel .panel__dropdown-menu li > a:hover { background: #f4f4f4; text-decoration: none; }
.panel .panel__dropdown-menu li > a i { margin: -4px 4px 0 0; }

.panel .panel__dropdown-menu--small { max-height: 200px; overflow-y: auto; }

.panel .panel__dropdown:hover .panel__dropdown-icon i { visibility: hidden; opacity: 0; }
.panel .panel__dropdown:hover .panel__dropdown-icon i + i { visibility: visible; opacity: 1; }
.panel .panel__dropdown:hover .panel__dropdown-menu { visibility: visible; opacity: 1; }

.panel .panel__project-link { margin: 0 0 0 14px; color: #888888; font-family: 'Archivo Narrow', 'Archivo', Arial, sans-serif; font-size: 12px; font-weight: bold; text-transform: uppercase; }
.panel .panel__project-link:hover { color: #0079bf; text-decoration: none; }

.panel .panel__project-link i { margin: -4px 4px 0 0; }

.panel .panel__foot { position: absolute; z-index: 10; left: 0; bottom: 0; display: flex; align-items: center; width: 100%; height: 60px; padding: 15px; border-top: 1px solid #ededed; }

.panel .panel__logo { width: 70px; }

.panel .panel__credits { margin-left: auto; font-size: 11px; font-family: 'Archivo Narrow', 'Archivo', Arial, sans-serif; color: #999999; }
.panel .panel__credits a { text-decoration: underline; }
.panel .panel__credits a:hover { text-decoration: none; }

/*  Panel Collapsed  */
.panel--collapsed { box-shadow: none; }
.panel--collapsed .panel__toggle i { transform: rotate(180deg); }
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

.user { padding: 10px 15px; }

.user .user__name { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

.user .user__fullname { font-size: 13px; color: #666666; }
.user .user__avatar { display: inline-block; vertical-align: middle; width: 20px; height: 20px; border-radius: 2px; margin-right: 2px; }
.user .user__initials { display: inline-block; vertical-align: middle; width: 20px; height: 20px; line-height: 20px; border-radius: 2px; margin-right: 2px; background: #d6dadc; text-align: center; font-family: 'Archivo Narrow', 'Archivo', Arial, sans-serif; font-size: 12px; font-weight: bold; color: #888; }


/* ------------------------------------------------------------ *\
	Issues
\* ------------------------------------------------------------ */

.issues .issues__message { padding: 12px 8px; text-align: center; font-size: 14px; }
.issues .issues__holder { transition: all .2s; }

.issues .issues__count { padding: 6px 10px; margin-bottom: 2px; background: #e9eaea; font-size: 11px; color: #666666; }

/* ------------------------------------------------------------ *\
	Filters
\* ------------------------------------------------------------ */

.filters { position: relative; z-index: 5; margin: 0 0 1px; background: #f5f5f5; }

.filters .filters__toggle { position: relative; width: 100%; padding: 10px 15px; background: #f2f3f5; border: 0; border-radius: 0; font-family: 'Archivo Narrow', 'Archivo', Arial, sans-serif; font-size: 12px; font-weight: bold; color: #888; text-transform: uppercase; cursor: pointer; text-align: left; transition: all .2s; }
.filters .filters__toggle:hover { background: #e3e4e4; }
.filters .filters__toggle i { margin: -4px 6px 0 0; }
.filters .filters__toggle i + i { position: absolute; right: 15px; top: 50%; margin-top: -4px; opacity: .5; transition: all .2s; }

.filters .filters__body { padding: 10px 15px 18px; background: #e3e4e4; }
.filters .filters__body:after { content: ''; display: table; clear: both; line-height: 0; }

.filters .filters__section { float: left; width: 50%; }
.filters .filters__section + .filters__section { padding-left: 10px; }

.filters .filters__section--large { width: 65%; }
.filters .filters__section--small { width: 35%; }

.filters .filters__section-title { margin-bottom: 8px; font-family: 'Archivo Narrow', 'Archivo', Arial, sans-serif; font-size: 10px; font-weight: bold; color: #888888; text-transform: uppercase; }

.filters .filters__count { text-align: center; font-size: 11px; }

.filters--expanded .filters__toggle i + i { transform: rotate(180deg); }


/* ------------------------------------------------------------ *\
	Issue
\* ------------------------------------------------------------ */

.issue { position: relative; padding: 20px 12px; margin-bottom: 2px; background: #f4f4f4; font-size: 13px; cursor: pointer; transition: all .2s; }
.issue:last-child { margin-bottom: 0; }

.issue:hover { background: #eeeeee; }

.issue .issue__inner { position: relative; padding-left: 24px; }

.issue .issue__link { position: absolute; left: 1px; top: 1px; width: 14px; }

.issue .issue__title { font-size: 1em; font-weight: normal; word-break: break-all; }

.issue .issue__meta { margin-top: 10px; list-style: none outside none; font-size: 0; color: #999999; }
.issue .issue__meta li { display: inline-block; vertical-align: middle; font-size: 11px; line-height: 1; }
.issue .issue__meta li + li { border-left: 1px solid #ccc; padding-left: 6px; margin-left: 6px; }

.issue .issue__meta span { display: inline-block; vertical-align: top; }
.issue .issue__meta img { display: inline-block; vertical-align: top; width: 12px; height: auto; }

.issue .issue__badge { margin: -2px 2px 0 0; }


/* ------------------------------------------------------------ *\
	Issue Details
\* ------------------------------------------------------------ */

.issue-details .issue__actions { display: flex; margin-bottom: 2px; }

.issue-details .issue__actions a { flex: 1 1 auto; padding: 10px 14px; background: #f2f3f5; text-align: left; color: #888888; font-size: 12px; font-weight: bold; font-family: 'Archivo Narrow', 'Archivo', Arial, sans-serif; text-transform: uppercase; transition: background .2s; }
.issue-details .issue__actions a:hover { background: #e3e4e4; text-decoration: none; }

.issue-details .issue__actions a i { margin: -2px 8px 0 0; }
.issue-details .issue__actions .ico-chevron-left { opacity: .5; }

.issue-details .issue__actions .issue__link { flex: 0 0 auto; margin-left: 2px; background: #0079be; color: #fff; }
.issue-details .issue__actions .issue__link:hover { background: #0083cf; }

.issue-details .issue__section { padding: 16px; }
.issue-details .issue__section + .issue__section { border-top: 1px solid #ededed; }

.issue-details .issue__section-title { display: block; margin-bottom: 15px; color: #888; font-size: 12px; font-weight: bold; font-family: 'Archivo Narrow', 'Archivo', Arial, sans-serif; text-transform: uppercase; }

.issue-details .issue__title { padding: 20px; background: #f4f4f4; color: #666666; font-size: 14px; word-break: break-all; }

.issue-details .issue__comments { display: inline-block; vertical-align: middle; padding: 2px 4px; background: #e3e4e4; border-radius: 5px; font-size: 10px; color: #666666; }
.issue-details .issue__comments img { display: inline-block; vertical-align: middle; width: 12px; margin: -2px 2px 0 0; }

.issue-details .issue__meta { margin-bottom: 10px; }

.issue-details .issue__link img { display: inline-block; vertical-align: middle; width: 14px; margin-right: 5px; }

.issue-details .issue__screenshots { margin-bottom: 12px; }

.issue-details .issue__screenshots strong { display: block; margin-bottom: 4px; }
.issue-details .issue__screenshots ul { list-style: none outside none; }
.issue-details .issue__screenshots li { display: inline-block; vertical-align: top; width: 100px; height: 60px; margin-right: 10px; border: 1px solid #ededed; transition: all .2s; }
.issue-details .issue__screenshots li:hover { border-color: #dddddd; }
.issue-details .issue__screenshots a { display: block; }
.issue-details .issue__screenshots img { width: 100%; height: auto; }

.issue-details .issue__log { position: relative; background: #eee; padding: 8px; margin-bottom: 4px; border-radius: 2px; font-size: 12px; line-height: 1; }
.issue-details .issue__log ul { height: 150px; overflow-y: auto; }
.issue-details .issue__log li { padding-bottom: 4px; border-bottom: 1px dotted #ccc; margin-bottom: 4px; }
.issue-details .issue__log li:last-child { margin-bottom: 0; }

/* ------------------------------------------------------------ *\
	Badge
\* ------------------------------------------------------------ */

.badge { display: inline-block; vertical-align: middle; padding: 2px 8px; background: #ccc; border-radius: 5px; font-size: 10px; color: #fff; font-weight: bold; line-height: 1.2; }


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
