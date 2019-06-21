(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{19:function(e,t,a){e.exports=a(43)},25:function(e,t,a){},43:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),r=a(18),o=a.n(r),i=(a(25),a(3)),l=a(4),c=a(6),u=a(5),d=a(7),m=a(8),h=a(2),g=a.n(h),p="https://sleepy-ravine-96026.herokuapp.com",f=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).errorHandler=function(e){a.setState({showError:!0,errorMessage:e}),setTimeout(function(){a.setState({showError:!1})},2500)},a.changeHandler=function(e){var t="checkbox"===e.target.type?e.target.checked:e.target.value;a.setState(Object(m.a)({},e.target.name,t))},a.toggleSignIn=function(){a.setState({isSignIn:!a.state.isSignIn})},a.submitAuth=function(e){e.preventDefault();var t=a.state,n=t.username,s=t.password,r=t.passConfirm,o=t.isSignIn,i="/sign-in",l=o?i:"/sign-up";if(!o&&s!==r)return a.errorHandler("passwords do not match");g.a.post(p+l,{username:n,password:s}).then(function(e){return o?e:g.a.post(p+i,{username:n,password:s})}).then(function(e){e.data.token={Authorization:"Bearer ".concat(e.data.token)},a.state.rememberMe?localStorage.setItem("user",JSON.stringify(e.data)):sessionStorage.setItem("user",JSON.stringify(e.data)),a.props.authDataHandler(e.data)}).catch(function(e){var t=e.response.data;a.errorHandler(t)})},a.state={isSignIn:!0,username:"",password:"",passConfirm:"",remeberMe:!1,showError:!1,errorMessage:""},a}return Object(d.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.state,t=e.isSignIn,a=e.username,n=e.password,r=e.passConfirm,o=e.errorMessage,i=e.showError;return s.a.createElement("div",{className:"section"},s.a.createElement("form",{className:"mb-2",onSubmit:this.submitAuth},s.a.createElement("div",{className:"field"},s.a.createElement("label",{className:"label"},t?"Sign in":"Sign up"),s.a.createElement("div",{className:"control"},s.a.createElement("input",{required:!0,className:"input",name:"username",placeholder:"Enter username",value:a,onChange:this.changeHandler}))),s.a.createElement("div",{className:"field"},s.a.createElement("div",{className:"control"},s.a.createElement("input",{required:!0,className:"input",name:"password",placeholder:"Enter password",value:n,onChange:this.changeHandler}))),!t&&s.a.createElement("div",{className:"field"},s.a.createElement("input",{required:!0,className:"input",name:"passConfirm",placeholder:"Confirm password",value:r,onChange:this.changeHandler})),s.a.createElement("label",{className:"checkbox"},s.a.createElement("input",{name:"rememberMe",type:"checkbox",onChange:this.changeHandler}),"Remember me"),s.a.createElement("div",{className:"field"},s.a.createElement("div",{className:"control"},s.a.createElement("input",{className:"button is-primary is-fullwidth",type:"submit"}))),i&&s.a.createElement("p",{className:"has-text-danger is-centered"},o)),s.a.createElement("button",{className:"button is-secondary is-fullwidth",onClick:this.toggleSignIn},t?"Register":"Sign in"))}}]),t}(n.Component),E=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).alertHandler=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];a.setState({alertMessage:e,showMessage:!0,isError:!!t}),setTimeout(function(){a.setState({showMessage:!1,isError:!1})},2500)},a.changeHandler=function(e){a.setState(Object(m.a)({},e.target.name,e.target.value))},a.changPw=function(e){var t=a.state,n=t.passConfirm,s=t.newPassword;if(e.preventDefault(),n!==s)return a.alertHandler("Passwords do not match",!0);g.a.patch(p+"/change-pass",{passConfirm:n,newPassword:s},{headers:a.props.user.token}).then(function(){a.setState({newPassword:"",passConfirm:""}),a.alertHandler("Password Successfully changed")}).catch(function(e){console.error(e),a.alertHandler("Something went wrong, try again later",!0)})},a.signOut=function(){localStorage.clear(),sessionStorage.clear(),g.a.delete(p+"/sign-out",{headers:a.props.user.token}).then(function(e){a.props.signOutHandler()}).catch(function(e){a.alertHandler("Something went wrong! Try refreshing and signing back in"),console.error(e.response)})},a.state={passConfirm:"",newPassword:"",alertMessage:"",showMessage:!1,isError:!1},a}return Object(d.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.state,t=e.passConfirm,a=e.newPassword,n=e.showMessage,r=e.alertMessage,o=e.isError;return s.a.createElement("div",null,s.a.createElement("form",{className:"my-3",onSubmit:this.changPw},s.a.createElement("div",{className:"field"},s.a.createElement("label",{className:"label"},"Change Password"),s.a.createElement("div",{className:"control"},s.a.createElement("input",{className:"input",type:"text",name:"newPassword",value:a,placeholder:"New password",onChange:this.changeHandler})),s.a.createElement("div",{className:"control"},s.a.createElement("input",{className:"input",type:"text",name:"passConfirm",value:t,placeholder:"Confirm new password",onChange:this.changeHandler}))),s.a.createElement("input",{className:"button is-fullwidth is-outlined is-info",type:"submit",value:"Change Password"})),s.a.createElement("button",{className:"button is-fullwidth is-outlined is-danger",onClick:this.signOut},"Sign out"),n&&s.a.createElement("p",{className:o?"has-text-danger":"has-text-info"},r))}}]),t}(n.Component),v=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).changeHandler=function(e){a.setState(Object(m.a)({},e.target.name,e.target.value))},a.toggleEdit=function(){a.setState({value:a.props.content,editable:!a.state.editable})},a.submitUpdate=function(e){e.preventDefault(),a.props.updateHandler({change:a.state.value,id:a.props.id}),a.toggleEdit()},a.deletion=function(){a.props.deleteHandler(a.props.id)},a.state={editable:!1,value:a.props.content},a}return Object(d.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.state,t=e.value,a=e.editable,n=this.props,r=n.id,o=n.content;return s.a.createElement("div",null,a&&s.a.createElement("form",{onSubmit:this.submitUpdate},s.a.createElement("div",{className:"field has-addons"},s.a.createElement("div",{className:"control"},s.a.createElement("input",{className:"input",type:"text",name:"value",value:t,onChange:this.changeHandler})),s.a.createElement("div",{className:"control"},s.a.createElement("input",{className:"button is-outlined is-primary",type:"submit"})))),!a&&s.a.createElement(s.a.Fragment,null,s.a.createElement("p",{className:"is-size-4",id:r},o),s.a.createElement("button",{className:"button is-outlined is-danger",onClick:this.deletion},"delete")),s.a.createElement("button",{className:"button is-outlined is-info",onClick:this.toggleEdit},a?"cancel":"edit"))}}]),t}(n.Component),b="/todos",w=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).alertHandler=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];a.setState({alertMessage:e,showMessage:!0,isError:!!t}),setTimeout(function(){a.setState({showMessage:!1,isError:!1})},2500)},a.changeHandler=function(e){a.setState(Object(m.a)({},e.target.name,e.target.value))},a.newEntry=function(e){e.preventDefault(),0===a.state.title.length&&a.alertHandler("Entry cannot be empty",!0),g.a.post(p+b,{title:a.state.title},{headers:a.props.user.token}).then(function(e){var t=a.state.todos;t.push(e.data),a.setState({todos:t})}).catch(function(e){console.error(e),a.alertHandler("Something went wrong",!0)})},a.updateEntry=function(e){g.a.patch(p+b+"/"+e.id,{title:e.change},{headers:a.props.user.token}).then(function(){var t=a.state.todos,n=t.findIndex(function(t){return t.id===e.id});t[n]=Object.assign({},t[n],{title:e.change}),a.setState({todos:t})}).catch(function(e){console.error(e),a.alertHandler("Something went wrong",!0)})},a.deleteEntry=function(e){g.a.delete(p+b+"/"+e,{headers:a.props.user.token}).then(function(){var t=a.state.todos,n=t.findIndex(function(t){return t.id===e});t.splice(n,1),a.setState({todos:t})}).catch(function(e){console.error(e),a.alertHandler("Something went wrong",!0)})},a.state={todos:[],todosIsGetting:!0,todosGetFailed:!1,alertMessage:"",title:"",isError:!1},a}return Object(d.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this;g.a.get(p+b,{headers:this.props.user.token}).then(function(t){e.setState({todosIsGetting:!1,todos:t.data})}).catch(function(t){e.setState({todosIsGetting:!1,todosGetFailed:!0}),console.error(t)})}},{key:"render",value:function(){var e=this,t=this.state,a=t.todos,n=t.todosGetFailed,r=t.todosIsGetting,o=t.title,i=t.showMessage,l=t.alertMessage,c=t.isError;return s.a.createElement("div",{className:"container mt-3"},s.a.createElement("h1",{className:"title"},"Things I need to do"),s.a.createElement("form",{className:"mb-3",onSubmit:this.newEntry},s.a.createElement("div",{className:"field"},s.a.createElement("label",{className:"label"},"Add a new entry"),s.a.createElement("div",{className:"field has-addons"},s.a.createElement("div",{className:"control"},s.a.createElement("input",{required:!0,className:"input",type:"text",name:"title",value:o,onChange:this.changeHandler})),s.a.createElement("div",{className:"control"}),s.a.createElement("button",{className:"button is-outlined is-primary",type:"submit"},"Add")),i&&s.a.createElement("p",{className:"help "+(c?"is-danger":"is-info")},l))),s.a.createElement("div",null,r?s.a.createElement("p",null,"Loading..."):n?s.a.createElement("p",null,"Something went wrong! try refreshing"):a.map(function(t,a){return s.a.createElement(v,{key:a,id:t.id,content:t.title,updateHandler:e.updateEntry,deleteHandler:e.deleteEntry})})))}}]),t}(n.Component),N=function(e){function t(e){var a,n,s;return Object(i.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).authDataHandler=function(e){a.setState({isAuth:!0,user:e})},a.signOutHandler=function(){a.setState({isAuth:!1,user:null})},0!==sessionStorage.length&&(s=JSON.parse(sessionStorage.getItem("user"))),0!==localStorage.length&&(s=JSON.parse(localStorage.getItem("user"))),n=!!s,a.state={isAuth:n,user:s},a}return Object(d.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.state,t=e.isAuth,a=e.user;return s.a.createElement("div",{className:"container"},s.a.createElement("div",{className:"columns is-8 is-variable is-centered is-vcentered"},t?s.a.createElement(s.a.Fragment,null,s.a.createElement("div",{className:"column is-one-fifth"},s.a.createElement(E,{user:a,signOutHandler:this.signOutHandler})),s.a.createElement("div",{className:"column"},s.a.createElement(w,{user:a}))):s.a.createElement("div",{className:"column is-two-fifths"},s.a.createElement(f,{authDataHandler:this.authDataHandler}))))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(s.a.createElement(N,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[19,1,2]]]);
//# sourceMappingURL=main.1b198d69.chunk.js.map