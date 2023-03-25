(this["webpackJsonpreact-todolist"]=this["webpackJsonpreact-todolist"]||[]).push([[0],{129:function(t,e,a){},130:function(t,e,a){},154:function(t,e,a){"use strict";a.r(e);var n,r,i=a(0),c=a.n(i),s=a(36),o=a.n(s),d=(a(129),a(130),a(22)),l=a(23),u=a(15),b=a.n(u),p=a(28),j=a(103),f=a.n(j).a.create({baseURL:"https://social-network.samuraijs.com/api/1.1/",withCredentials:!0,headers:{"API-KEY":"fb1b255d-daf2-447b-9658-1df546c81b09"}}),h=function(){return f.get("todo-lists")},O=function(t){return f.post("todo-lists",{title:t})},x=function(t){return f.delete("todo-lists/".concat(t))},v=function(t,e){return f.put("todo-lists/".concat(t),{title:e})},m=function(t){return f.get("todo-lists/".concat(t,"/tasks"))},k=function(t,e){return f.delete("todo-lists/".concat(t,"/tasks/").concat(e))},g=function(t,e){return f.post("todo-lists/".concat(t,"/tasks"),{title:e})},I=function(t,e,a){return f.put("todo-lists/".concat(t,"/tasks/").concat(e),a)},y=function(t){return f.post("auth/login",t)},C=function(){return f.delete("auth/login")},T=function(){return f.get("auth/me")};!function(t){t[t.New=0]="New",t[t.InProgress=1]="InProgress",t[t.Completed=2]="Completed",t[t.Draft=3]="Draft"}(n||(n={})),function(t){t[t.Low=0]="Low",t[t.Middle=1]="Middle",t[t.Hi=2]="Hi",t[t.Urgently=3]="Urgently",t[t.Later=4]="Later"}(r||(r={}));var w=function(t,e){t.messages.length?e(N(t.messages[0])):e(N("Some error occurred")),e(D("failed"))},S=function(t,e){e(N(t.message?t.message:"Some error occurred")),e(D("failed"))},L=a(20),V=Object(L.b)("auth/logout",function(){var t=Object(p.a)(b.a.mark((function t(e,a){var n;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.dispatch(D("loading")),t.prev=1,t.next=4,C();case 4:if(0!==(n=t.sent).data.resultCode){t.next=10;break}return a.dispatch(D("succeeded")),t.abrupt("return",{isLoggedIn:!1});case 10:return w(n.data,a.dispatch),t.abrupt("return",a.rejectWithValue({isLoggedIn:!0}));case 12:t.next=18;break;case 14:return t.prev=14,t.t0=t.catch(1),S(t.t0,a.dispatch),t.abrupt("return",a.rejectWithValue({isLoggedIn:!0}));case 18:case"end":return t.stop()}}),t,null,[[1,14]])})));return function(e,a){return t.apply(this,arguments)}}()),W=Object(L.b)("auth/login",function(){var t=Object(p.a)(b.a.mark((function t(e,a){var n;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.dispatch(D("loading")),t.prev=1,t.next=4,y(e);case 4:if(0!==(n=t.sent).data.resultCode){t.next=10;break}return a.dispatch(D("succeeded")),t.abrupt("return",{isLoggedIn:!0});case 10:return w(n.data,a.dispatch),t.abrupt("return",a.rejectWithValue({isLoggedIn:!1}));case 12:t.next=18;break;case 14:return t.prev=14,t.t0=t.catch(1),S(t.t0,a.dispatch),t.abrupt("return",a.rejectWithValue({isLoggedIn:!1}));case 18:case"end":return t.stop()}}),t,null,[[1,14]])})));return function(e,a){return t.apply(this,arguments)}}()),F=Object(L.c)({name:"auth",initialState:{isLoggedIn:!1},reducers:{setIsLoggedIn:function(t,e){t.isLoggedIn=e.payload}},extraReducers:function(t){t.addCase(W.fulfilled,(function(t,e){t.isLoggedIn=e.payload.isLoggedIn})),t.addCase(V.fulfilled,(function(t,e){t.isLoggedIn=e.payload.isLoggedIn}))}}),A=F.actions.setIsLoggedIn,E=F.reducer,M=Object(L.b)("app/initializeApp",function(){var t=Object(p.a)(b.a.mark((function t(e,a){var n;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,T();case 3:if(0!==(n=t.sent).data.resultCode){t.next=9;break}return a.dispatch(A(!0)),t.abrupt("return",{isInitialized:!0});case 9:return w(n.data,a.dispatch),t.abrupt("return",a.rejectWithValue({isInitialized:!0}));case 11:t.next=17;break;case 13:return t.prev=13,t.t0=t.catch(0),S(t.t0,a.dispatch),t.abrupt("return",a.rejectWithValue({isInitialized:!1}));case 17:case"end":return t.stop()}}),t,null,[[0,13]])})));return function(e,a){return t.apply(this,arguments)}}()),P=Object(L.c)({name:"app",initialState:{status:"idle",error:null,isInitialized:!1},reducers:{setAppStatus:function(t,e){t.status=e.payload},setAppError:function(t,e){t.error=e.payload}},extraReducers:function(t){t.addCase(M.fulfilled,(function(t,e){t.isInitialized=e.payload.isInitialized}))}}),z=P.actions,D=z.setAppStatus,N=z.setAppError,R=P.reducer,B=Object(L.b)("todolists/fetchTodolist",function(){var t=Object(p.a)(b.a.mark((function t(e,a){var n;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.dispatch(D("loading")),t.prev=1,t.next=4,h();case 4:return n=t.sent,a.dispatch(D("succeeded")),t.abrupt("return",n.data);case 9:return t.prev=9,t.t0=t.catch(1),S(t.t0,a.dispatch),t.abrupt("return",a.rejectWithValue(null));case 13:case"end":return t.stop()}}),t,null,[[1,9]])})));return function(e,a){return t.apply(this,arguments)}}()),U=Object(L.b)("todolists/removeTodolist",function(){var t=Object(p.a)(b.a.mark((function t(e,a){var n;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.dispatch(D("loading")),a.dispatch(_({todolistId:e,status:"loading"})),t.prev=2,t.next=5,x(e);case 5:if(0!==(n=t.sent).data.resultCode){t.next=11;break}return a.dispatch(D("succeeded")),t.abrupt("return",{id:e});case 11:return w(n.data,a.dispatch),t.abrupt("return",a.rejectWithValue(null));case 13:t.next=19;break;case 15:return t.prev=15,t.t0=t.catch(2),S(t.t0,a.dispatch),t.abrupt("return",a.rejectWithValue(null));case 19:case"end":return t.stop()}}),t,null,[[2,15]])})));return function(e,a){return t.apply(this,arguments)}}()),H=Object(L.b)("todolists/addTodolist",function(){var t=Object(p.a)(b.a.mark((function t(e,a){var n;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.dispatch(D("loading")),t.prev=1,t.next=4,O(e);case 4:if(0!==(n=t.sent).data.resultCode){t.next=10;break}return a.dispatch(D("succeeded")),t.abrupt("return",n.data.data.item);case 10:return w(n.data,a.dispatch),t.abrupt("return",a.rejectWithValue(null));case 12:t.next=18;break;case 14:return t.prev=14,t.t0=t.catch(1),S(t.t0,a.dispatch),t.abrupt("return",a.rejectWithValue(null));case 18:case"end":return t.stop()}}),t,null,[[1,14]])})));return function(e,a){return t.apply(this,arguments)}}()),Z=Object(L.b)("todolists/changeTodolistTitle",function(){var t=Object(p.a)(b.a.mark((function t(e,a){var n;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.dispatch(D("loading")),t.prev=1,t.next=4,v(e.id,e.title);case 4:if(0!==(n=t.sent).data.resultCode){t.next=10;break}return a.dispatch(D("succeeded")),t.abrupt("return",{todolistId:e.id,title:e.title});case 10:return w(n.data,a.dispatch),t.abrupt("return",a.rejectWithValue(null));case 12:t.next=18;break;case 14:return t.prev=14,t.t0=t.catch(1),S(t.t0,a.dispatch),t.abrupt("return",a.rejectWithValue(null));case 18:case"end":return t.stop()}}),t,null,[[1,14]])})));return function(e,a){return t.apply(this,arguments)}}()),q=Object(L.c)({name:"todolists",initialState:[],reducers:{changeTodolistFilter:function(t,e){var a=t.find((function(t){return t.id===e.payload.todolistId}));a&&(a.filter=e.payload.filter)},changeTodolistEntityStatus:function(t,e){var a=t.find((function(t){return t.id===e.payload.todolistId}));a&&(a.entityStatus=e.payload.status)}},extraReducers:function(t){t.addCase(B.fulfilled,(function(t,e){return e.payload.map((function(t){return Object(l.a)(Object(l.a)({},t),{},{filter:"all",entityStatus:"idle"})}))})),t.addCase(U.fulfilled,(function(t,e){var a=t.findIndex((function(t){return t.id===e.payload.id}));a>-1&&t.splice(a,1)})),t.addCase(H.fulfilled,(function(t,e){t.unshift(Object(l.a)(Object(l.a)({},e.payload),{},{filter:"all",entityStatus:"idle"}))})),t.addCase(Z.fulfilled,(function(t,e){var a=t.find((function(t){return t.id===e.payload.todolistId}));a&&(a.title=e.payload.title)}))}}),J=q.actions,K=J.changeTodolistFilter,_=J.changeTodolistEntityStatus,G=q.reducer,Y=Object(L.b)("tasks/updateTask",function(){var t=Object(p.a)(b.a.mark((function t(e,a){var n,r,i,c;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n=a.getState(),r=n.tasks[e.todolistId].find((function(t){return t.id===e.taskId}))){t.next=4;break}return t.abrupt("return",a.rejectWithValue("task not found in the state"));case 4:return i=Object(l.a)({deadline:r.deadline,description:r.description,priority:r.priority,startDate:r.startDate,title:r.title,status:r.status},e.domainModel),t.prev=5,t.next=8,I(e.todolistId,e.taskId,i);case 8:if(0!==(c=t.sent).data.resultCode){t.next=13;break}return t.abrupt("return",{taskId:e.taskId,domainModel:e.domainModel,todolistId:e.todolistId});case 13:return w(c.data,a.dispatch),t.abrupt("return",a.rejectWithValue(null));case 15:t.next=21;break;case 17:return t.prev=17,t.t0=t.catch(5),S(t.t0,a.dispatch),t.abrupt("return",a.rejectWithValue(null));case 21:case"end":return t.stop()}}),t,null,[[5,17]])})));return function(e,a){return t.apply(this,arguments)}}()),$=Object(L.b)("tasks/addTask",function(){var t=Object(p.a)(b.a.mark((function t(e,a){var n;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.dispatch(D("loading")),t.next=3,g(e.todolistId,e.title);case 3:if(n=t.sent,t.prev=4,0!==n.data.resultCode){t.next=10;break}return a.dispatch(D("succeeded")),t.abrupt("return",n.data.data.item);case 10:return w(n.data,a.dispatch),t.abrupt("return",a.rejectWithValue(null));case 12:t.next=18;break;case 14:return t.prev=14,t.t0=t.catch(4),S(t.t0,a.dispatch),t.abrupt("return",a.rejectWithValue(null));case 18:case"end":return t.stop()}}),t,null,[[4,14]])})));return function(e,a){return t.apply(this,arguments)}}()),Q=Object(L.b)("tasks/fetchTasks",function(){var t=Object(p.a)(b.a.mark((function t(e,a){var n,r;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.dispatch(D("loading")),t.prev=1,t.next=4,m(e);case 4:return n=t.sent,a.dispatch(D("succeeded")),r=n.data.items,t.abrupt("return",{tasks:r,todolistId:e});case 10:return t.prev=10,t.t0=t.catch(1),S(t.t0,a.dispatch),t.abrupt("return",a.rejectWithValue(null));case 14:case"end":return t.stop()}}),t,null,[[1,10]])})));return function(e,a){return t.apply(this,arguments)}}()),X=Object(L.b)("tasks/removeTask",function(){var t=Object(p.a)(b.a.mark((function t(e,a){var n;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.dispatch(D("loading")),t.prev=1,t.next=4,k(e.todolistId,e.taskId);case 4:if(0!==(n=t.sent).data.resultCode){t.next=10;break}return a.dispatch(D("succeeded")),t.abrupt("return",{taskId:e.taskId,todolistId:e.todolistId});case 10:return w(n.data,a.dispatch),t.abrupt("return",a.rejectWithValue(null));case 12:t.next=18;break;case 14:return t.prev=14,t.t0=t.catch(1),S(t.t0,a.dispatch),t.abrupt("return",a.rejectWithValue(null));case 18:case"end":return t.stop()}}),t,null,[[1,14]])})));return function(e,a){return t.apply(this,arguments)}}()),tt=Object(L.c)({name:"tasks",initialState:{},reducers:{updateTask:function(t,e){var a=t[e.payload.todolistId],n=a.findIndex((function(t){return t.id===e.payload.taskId}));a[n]=Object(l.a)(Object(l.a)({},a[n]),e.payload.domainModel)}},extraReducers:function(t){t.addCase($.fulfilled,(function(t,e){t[e.payload.todoListId].unshift(e.payload)})),t.addCase(Y.fulfilled,(function(t,e){var a=t[e.payload.todolistId],n=a.findIndex((function(t){return t.id===e.payload.taskId}));a[n]=Object(l.a)(Object(l.a)({},a[n]),e.payload.domainModel)})),t.addCase(H.fulfilled,(function(t,e){t[e.payload.id]=[]})),t.addCase(U.fulfilled,(function(t,e){delete t[e.payload.id]})),t.addCase(B.fulfilled,(function(t,e){e.payload.forEach((function(e){t[e.id]=[]}))})),t.addCase(Q.fulfilled,(function(t,e){t[e.payload.todolistId]=e.payload.tasks})),t.addCase(X.fulfilled,(function(t,e){var a=t[e.payload.todolistId],n=a.findIndex((function(t){return t.id===e.payload.taskId}));n>-1&&a.splice(n,1)}))}}).reducer,et=a(208),at=a(217),nt=a(13),rt=a(201),it=a(209),ct=a(197),st=a(1),ot=c.a.memo((function(t){var e=t.addItem,a=t.disabled,n=void 0!==a&&a;console.log("AddItemForm called");var r=Object(i.useState)(""),c=Object(nt.a)(r,2),s=c[0],o=c[1],d=Object(i.useState)(null),l=Object(nt.a)(d,2),u=l[0],b=l[1],p=function(){""!==s.trim()?(e(s),o("")):b("Title is required")};return Object(st.jsxs)("div",{children:[Object(st.jsx)(rt.a,{variant:"outlined",disabled:n,error:!!u,value:s,onChange:function(t){o(t.currentTarget.value)},onKeyPress:function(t){null!==u&&b(null),13===t.charCode&&p()},label:"Title",helperText:u}),Object(st.jsx)(it.a,{color:"primary",onClick:p,disabled:n,children:Object(st.jsx)(ct.a,{})})]})})),dt=a(110),lt=c.a.memo((function(t){console.log("EditableSpan called");var e=Object(i.useState)(!1),a=Object(nt.a)(e,2),n=a[0],r=a[1],c=Object(i.useState)(t.value),s=Object(nt.a)(c,2),o=s[0],d=s[1];return n?Object(st.jsx)(rt.a,{value:o,onChange:function(t){d(t.currentTarget.value)},autoFocus:!0,onBlur:function(){r(!1),t.onChange(o)}}):Object(st.jsx)("span",{onDoubleClick:function(){r(!0),d(t.value)},children:t.value})})),ut=a(210),bt=a(198),pt=a(203),jt=c.a.memo((function(t){var e=Object(i.useCallback)((function(){return t.removeTask(t.task.id,t.todolistId)}),[t.task.id,t.todolistId]),a=Object(i.useCallback)((function(e){var a=e.currentTarget.checked;t.changeTaskStatus(t.task.id,a?n.Completed:n.New,t.todolistId)}),[t.task.id,t.todolistId]),r=Object(i.useCallback)((function(e){t.changeTaskTitle(t.task.id,e,t.todolistId)}),[t.task.id,t.todolistId]);return Object(st.jsxs)("div",{className:t.task.status===n.Completed?"is-done":"",children:[Object(st.jsx)(pt.a,{checked:t.task.status===n.Completed,color:"primary",onChange:a}),Object(st.jsx)(lt,{value:t.task.title,onChange:r}),Object(st.jsx)(it.a,{onClick:e,children:Object(st.jsx)(bt.a,{})})]},t.task.id)})),ft=c.a.memo((function(t){var e=t.demo,a=void 0!==e&&e,r=Object(dt.a)(t,["demo"]);console.log("Todolist called");var c=Object(d.b)();Object(i.useEffect)((function(){if(!a){var t=Q(r.todolist.id);c(t)}}),[]);var s=Object(i.useCallback)((function(t){r.addTask(t,r.todolist.id)}),[r.addTask,r.todolist.id]),o=Object(i.useCallback)((function(t){r.changeTodolistTitle(r.todolist.id,t)}),[r.todolist.id,r.changeTodolistTitle]),l=Object(i.useCallback)((function(){return r.changeFilter("all",r.todolist.id)}),[r.todolist.id,r.changeFilter]),u=Object(i.useCallback)((function(){return r.changeFilter("active",r.todolist.id)}),[r.todolist.id,r.changeFilter]),b=Object(i.useCallback)((function(){return r.changeFilter("completed",r.todolist.id)}),[r.todolist.id,r.changeFilter]),p=r.tasks;return"active"===r.todolist.filter&&(p=r.tasks.filter((function(t){return t.status===n.New}))),"completed"===r.todolist.filter&&(p=r.tasks.filter((function(t){return t.status===n.Completed}))),Object(st.jsxs)("div",{children:[Object(st.jsxs)("h3",{children:[Object(st.jsx)(lt,{value:r.todolist.title,onChange:o}),Object(st.jsx)(it.a,{onClick:function(){r.removeTodolist(r.todolist.id)},disabled:"loading"===r.todolist.entityStatus,children:Object(st.jsx)(bt.a,{})})]}),Object(st.jsx)(ot,{addItem:s,disabled:"loading"===r.todolist.entityStatus}),Object(st.jsx)("div",{children:p.map((function(t){return Object(st.jsx)(jt,{task:t,todolistId:r.todolist.id,removeTask:r.removeTask,changeTaskTitle:r.changeTaskTitle,changeTaskStatus:r.changeTaskStatus},t.id)}))}),Object(st.jsxs)("div",{style:{paddingTop:"10px"},children:[Object(st.jsx)(ut.a,{variant:"all"===r.todolist.filter?"outlined":"text",onClick:l,color:"inherit",children:"All"}),Object(st.jsx)(ut.a,{variant:"active"===r.todolist.filter?"outlined":"text",onClick:u,color:"primary",children:"Active"}),Object(st.jsx)(ut.a,{variant:"completed"===r.todolist.filter?"outlined":"text",onClick:b,color:"secondary",children:"Completed"})]})]})})),ht=a(14),Ot=function(t){var e=t.demo,a=void 0!==e&&e,n=Object(d.c)((function(t){return t.todolists})),r=Object(d.c)((function(t){return t.tasks})),c=Object(d.c)((function(t){return t.auth.isLoggedIn})),s=Object(d.b)();Object(i.useEffect)((function(){if(!a&&c){var t=B();s(t)}}),[]);var o=Object(i.useCallback)((function(t,e){var a=X({taskId:t,todolistId:e});s(a)}),[]),l=Object(i.useCallback)((function(t,e){var a=$({title:t,todolistId:e});s(a)}),[]),u=Object(i.useCallback)((function(t,e,a){var n=Y({taskId:t,domainModel:{status:e},todolistId:a});s(n)}),[]),b=Object(i.useCallback)((function(t,e,a){var n=Y({taskId:t,domainModel:{title:e},todolistId:a});s(n)}),[]),p=Object(i.useCallback)((function(t,e){var a=K({todolistId:e,filter:t});s(a)}),[]),j=Object(i.useCallback)((function(t){var e=U(t);s(e)}),[]),f=Object(i.useCallback)((function(t,e){var a=Z({id:t,title:e});s(a)}),[]),h=Object(i.useCallback)((function(t){var e=H(t);s(e)}),[s]);return c?Object(st.jsxs)(st.Fragment,{children:[Object(st.jsx)(et.a,{container:!0,style:{padding:"20px"},children:Object(st.jsx)(ot,{addItem:h})}),Object(st.jsx)(et.a,{container:!0,spacing:3,children:n.map((function(t){var e=r[t.id];return Object(st.jsx)(et.a,{item:!0,children:Object(st.jsx)(at.a,{style:{padding:"10px"},children:Object(st.jsx)(ft,{todolist:t,tasks:e,removeTask:o,changeFilter:p,addTask:l,changeTaskStatus:u,removeTodolist:j,changeTaskTitle:b,changeTodolistTitle:f,demo:a})})},t.id)}))})]}):Object(st.jsx)(ht.a,{to:"/login"})},xt=a(213),vt=a(214),mt=a(211),kt=a(216),gt=a(215),It=a(200),yt=a(205),Ct=a(204),Tt=c.a.forwardRef((function(t,e){return Object(st.jsx)(Ct.a,Object(l.a)({elevation:6,ref:e,variant:"filled"},t))}));function wt(){var t=Object(d.c)((function(t){return t.app.error})),e=Object(d.b)(),a=function(t,a){"clickaway"!==a&&e(N(null))};return Object(st.jsx)(yt.a,{open:null!==t,autoHideDuration:6e3,onClose:a,children:Object(st.jsx)(Tt,{onClose:a,severity:"error",sx:{width:"100%"},children:t})})}var St=a(206),Lt=a(219),Vt=a(218),Wt=a(195),Ft=a(109),At=function(){var t=Object(d.c)((function(t){return t.auth.isLoggedIn})),e=Object(d.b)(),a=Object(Ft.a)({initialValues:{email:"",password:"",rememberMe:!1},validate:function(t){var e={};return t.email?/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(t.email)||(e.email="Invalid email address"):e.email="Required",e},onSubmit:function(t){e(W(Object(l.a)(Object(l.a)({},t),{},{captcha:!1}))),a.resetForm()}});return t?Object(st.jsx)(ht.a,{to:"/"}):Object(st.jsx)(et.a,{container:!0,justifyContent:"center",children:Object(st.jsx)(et.a,{item:!0,justifyContent:"center",children:Object(st.jsx)("form",{onSubmit:a.handleSubmit,children:Object(st.jsxs)(St.a,{children:[Object(st.jsxs)(Wt.a,{children:[Object(st.jsxs)("p",{children:["To log in get registered",Object(st.jsx)("a",{href:"https://social-network.samuraijs.com/",target:"_blank",children:" here"})]}),Object(st.jsx)("p",{children:"or use common test account credentials:"}),Object(st.jsx)("p",{children:"Email: free@samuraijs.com"}),Object(st.jsx)("p",{children:"Password: free"})]}),Object(st.jsxs)(Vt.a,{children:[Object(st.jsx)(rt.a,Object(l.a)(Object(l.a)({label:"Email",margin:"normal"},a.getFieldProps("email")),{},{onBlur:a.handleBlur})),a.touched.email&&a.errors.email?Object(st.jsx)("div",{style:{color:"red"},children:a.errors.email}):null,Object(st.jsx)(rt.a,Object(l.a)({type:"password",label:"Password",margin:"normal"},a.getFieldProps("password"))),Object(st.jsx)(Lt.a,{label:"Remember me",control:Object(st.jsx)(pt.a,Object(l.a)({},a.getFieldProps("rememberMe")))}),Object(st.jsx)(ut.a,{type:"submit",variant:"contained",color:"primary",children:"Login"})]})]})})})})},Et=a(212);var Mt=function(t){var e=t.demo,a=void 0!==e&&e,n=Object(d.c)((function(t){return t.app.status})),r=Object(d.c)((function(t){return t.app.isInitialized})),c=Object(d.c)((function(t){return t.auth.isLoggedIn})),s=Object(d.b)();return Object(i.useEffect)((function(){s(M())}),[]),r?Object(st.jsxs)("div",{className:"App",children:[Object(st.jsx)(wt,{}),Object(st.jsxs)(xt.a,{position:"static",children:[Object(st.jsxs)(vt.a,{children:[Object(st.jsx)(it.a,{edge:"start",color:"inherit","aria-label":"menu",children:Object(st.jsx)(It.a,{})}),Object(st.jsx)(mt.a,{variant:"h6",children:"TODOS"}),c&&Object(st.jsx)(ut.a,{onClick:function(){s(V())},color:"inherit",children:"Log out"})]}),"loading"===n&&Object(st.jsx)(gt.a,{})]}),Object(st.jsx)(kt.a,{fixed:!0,children:Object(st.jsxs)(ht.d,{children:[Object(st.jsx)(ht.b,{path:"/",element:Object(st.jsx)(Ot,{demo:a})}),Object(st.jsx)(ht.b,{path:"/login",element:Object(st.jsx)(At,{})}),Object(st.jsx)(ht.b,{path:"/404",element:Object(st.jsx)("h1",{children:"404: PAGE NOT FOUND"})}),Object(st.jsx)(ht.b,{path:"*",element:Object(st.jsx)(ht.a,{to:"/404"})})]})})]}):Object(st.jsx)("div",{style:{position:"fixed",top:"30%",textAlign:"center",width:"100%"},children:Object(st.jsx)(Et.a,{})})},Pt=a(107),zt=a(108),Dt=Object(zt.a)({tasks:tt,todolists:G,app:R,auth:E}),Nt=Object(L.a)({reducer:Dt,middleware:function(t){return t().prepend(Pt.a)}}),Rt=a(57);o.a.render(Object(st.jsx)(c.a.StrictMode,{children:Object(st.jsx)(Rt.a,{children:Object(st.jsx)(d.a,{store:Nt,children:Object(st.jsx)(Mt,{})})})}),document.getElementById("root"))}},[[154,1,2]]]);
//# sourceMappingURL=main.665eec13.chunk.js.map