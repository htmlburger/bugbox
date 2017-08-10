export const panelStyles = `
*,
*:before,
*:after { margin: 0; padding: 0; outline: 0; box-sizing: border-box; }

body { font-family: Arial, sans-serif; font-size: 14px; color: #555; line-height: 1.2; }

img { display: inline-block; vertical-align: middle; max-width: 100%; height: auto; }

p { margin-bottom: 1.2em; }
p:last-child { margin-bottom: 0; }

a { color: #03a9f4; text-decoration: none; }
a:hover { text-decoration: underline; }

::-webkit-scrollbar { width: 4px; height: 4px; }
::-webkit-scrollbar-track { background: #fff; }
::-webkit-scrollbar-thumb { border-radius: 4px; background: rgba(0,0,0,.3); }

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

.btn { display: inline-block; vertical-align: middle; padding: 10px 12px; background: #03a9f4; border: 0; border-radius: 2px; color: #fff; text-decoration: none; text-transform: uppercase; font-weight: bold; font-size: 12px; text-align: center; cursor: pointer; transition: all .2s; }
.btn:hover { background: #0391cd; text-decoration: none; }

.btn--full { width: 100%; }

.btn--success { background: #8bc34a; }
.btn--success:hover { background: #75a838; }

.btn--danger { background: #f44336; }
.btn--danger:hover { background: #f12112; }

/* ------------------------------------------------------------ *\
	Form Elements
\* ------------------------------------------------------------ */

.field { width: 100%; height: 30px; padding: 0 8px; border: 1px solid #ddd; border-radius: 2px; font-family: inherit; }

.textarea { width: 100%; padding: 6px 8px; border: 1px solid #ddd; border-radius: 2px; font-family: inherit; }

.select select { width: 100%; height: 30px; padding: 0 4px; border: 1px solid #ddd; border-radius: 2px; font-family: inherit; }

/* ------------------------------------------------------------ *\
	Form
\* ------------------------------------------------------------ */

.form { padding: 8px; }

.form .form__row { margin-bottom: 10px; }
.form .form__row:last-child { margin-bottom: 0; }

.form .form__preview { display: inline-block; vertical-align: top; max-width: 200px; max-height: 200px; border: 2px solid #ddd; }
.form .form__preview img { max-width: 100%; max-height: 100%; height: auto; width: auto; }


/* ------------------------------------------------------------ *\
	Panel
\* ------------------------------------------------------------ */

.panel { position: relative; height: 100%; padding: 50px 0 0; }

/* ------------------------------------------------------------ *\
	User
\* ------------------------------------------------------------ */

.user { position: absolute; z-index: 10; left: 0; top: 0; width: 100%; height: 50px; padding: 8px; border-bottom: 1px solid #ddd; box-shadow: 0 2px 3px 0 rgba(0,0,0,.1); }

.user .user__authorize { text-align: center; }

.user .user__name { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.user .user__name img { display: inline-block; vertical-align: middle; width: 34px; height: 34px; border-radius: 2px; margin-right: 2px; }


/* ------------------------------------------------------------ *\
	Issues
\* ------------------------------------------------------------ */

.issues { max-height: 100%; overflow: hidden; overflow-y: auto; }
.issues .issues__message { padding: 12px 8px; text-align: center; font-style: italic; opacity: .5; }


/* ------------------------------------------------------------ *\
	Issue
\* ------------------------------------------------------------ */

.issue { position: relative; padding: 8px; border-bottom: 1px solid #eee; font-size: 13px; cursor: pointer; transition: all .2s; }
.issue:hover { background: #eee; }

.issue .issue__inner { position: relative; padding-left: 20px; }

.issue .issue__link { position: absolute; left: 1px; top: 1px; width: 14px; }

.issue .issue__title { font-size: 1em; font-weight: normal; }

.issue .issue__meta { margin-top: 4px; font-size: .9em; opacity: .5; }


/* ------------------------------------------------------------ *\
	Issue Details
\* ------------------------------------------------------------ */

.issue-details .issue__back { display: block; padding: 12px 8px; background: #eee; border-bottom: 1px solid #ddd; color: #555; text-decoration: none; transition: all .2s; }
.issue-details .issue__back:hover { background: #fff; }

.issue-details .issue__inner { padding: 8px; }


/* ------------------------------------------------------------ *\
	Call to Action
\* ------------------------------------------------------------ */

.cta { padding: 12px 8px; }

`;
