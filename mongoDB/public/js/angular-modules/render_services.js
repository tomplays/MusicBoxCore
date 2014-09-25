'use strict';


      

// SOCKET part 
musicBox.factory('socket', function($rootScope, $http, $location)  {
  
  if(1){
    var socket = io.connect(socket_url);
   // console.log(socket)
    return {

      on: function (eventName, callback) {
        socket.on(eventName, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            callback.apply(socket, args);
          });
        });
      },
      emit: function (eventName, data, callback) {
        socket.emit(eventName, data, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            if (callback) {
              callback.apply(socket, args);
            }
          });
        })
      }
    };

  }
  else {
    var socket = '';
    return {
      on:  function () {},
      emit:  function () {}

    }
    
  };
});



musicBox.factory('renderfactory', function ($rootScope, $http, $location,$routeParams) {
    return function (inf) {
     var self = {

       init: function () {

          //$rootScope.$emit('renderEvent', { action:'render_ready' });
          self.config= new Array();
          self.state= new Array();


          self.config.hasbranding = true;
          self.state.logs = 'closed';

           // api/misc
            $rootScope.globals = GLOBALS;
            $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";



     //       $rootScope.render_available                  =    self.renderAvailable();
            $rootScope.available_sections_objects        =   self.objAvailable(); 
            $rootScope.fragment_types                    =   self.fragmentTypes();
            $rootScope.fragment_sub_types                =   self.fragmentSubTypes();
            $rootScope.available_layouts  =   self.posAvailable();

          // $rootScope.available_positions_objects_flat  =   self.posAvailableFlat();
          //  $rootScope.inline_markup_available           =   self.InlineMarkupAvailable();

            // used in doc.jade

            $rootScope.fragments                         =   self.fragmentsAvailable();
           // $rootScope.classesofsections                 =   self.classesAvailable();



         // console.log(self);


          console.log('render service on init_first')
        
        },


      objAvailable:function (){
        var arr = new Array('container','comment','place','data','version', 'translation','note','summary','summary-block','freebase','player','markup','css_styles','classes','img','child_section', 'semantic');
        return arr 
      },
      fragmentTypes:function (){
        var arr = new Array('note','data','summary','summary-block','img','player','child_section');
        return arr 
      },
      fragmentSubTypes:function (){
        // todo : groups
        var arr = new Array('pick one', 'world','city', 'hyperlocal', 'comment','place','code_block','data','year','unit','x','y','version','sc-track', 'translation','comment','wikipedia','youtube','vimeo','soundcloud','freebase','person-bio','summary','summary-block','img','child_section','semantic');
        return arr 
      },
      posAvailable:function (){

        var arr = new Array(
          {name:'wide', order:0},
          {name:'slidewide', order:1},
          {name:'center', order:2, include_title:true},
          {name:'left', order:3},
          {name:'inline_into_before',  order:4},
          {name:'inline', order:5, include_objects:false}, 
          {name:'inline-implicit', order:6},
          {name:'inline_into_after', order:7},
          
          {name:'right', order:8},
         
          {name:'under', order:9},
         
          {name:'global', order:10});

        arr  = _.sortBy(arr,function (num) {
         return num.order;
        });
        return arr;
      },
      posAvailableFlat:function (){
        var arr = new Array('left', 'right', 'wide', 'slidewide', 'center', 'under','global');
        return arr;
      },
      InlineMarkupAvailable:function (){
        var arr = new Array('h1', 'h2');
        return arr;
      },

      renderAvailable:function (){
        var arr = new Array('lire','read','fragments','sections','editor','dataset','logs', 'card', 'media');
        return arr 
      },
      fragmentsAvailable:function (){
        var arr = new Array();


            arr['markup_editor']             = [ {  url: 'fragments/markup_editor.jade'} ];
            arr['section_editor']            = [ {  url: 'fragments/section_editor.jade'} ];
            arr['markup_push']               = [{  url: 'fragments/markup_push.jade'} ];








            /*

            arr['branding']             = [ {  url: 'fragments/branding.jade'} ];
            arr['share']                = [ {  url: 'fragments/share'} ];
            arr['author_card']          = [ {  url: 'fragments/profile'} ]; 
            arr['comment_global']       = [ {  url: 'fragments/comment_global'} ];
            arr['docnodes']             = [ {  url: 'fragments/nodes'} ];
         
            arr['child_section']        = [ {  url: 'fragments/child_section.jade'} ];
            arr['date']                 = [ {  url: 'fragments/date'} ];
            
            arr['generic']              = [ {  url: 'fragments/generic'} ];
            
            arr['before_doc']           = [ {  url: 'fragments/before_doc'} ];
            arr['page_footer']          = [ {  url: 'fragments/page_footer'} ];
            arr['doc_footer']           = [ {  url: 'fragments/doc_footer'} ];
            arr['titles']               = [ {  url: 'fragments/titles'} ];
            arr['main']                 = [ {  url: 'fragments/main'} ];

            arr['main_d']                 = [ {  url: 'fragments/main_d'} ];
            arr['main_e']                 = [ {  url: 'fragments/main_e'} ];
            arr['main_f']                 = [ {  url: 'fragments/main_f'} ];
            arr['main_g']                 = [ {  url: 'fragments/main_g'} ];

            // generic ! (beacuse of 'tricky' param injection (with Express.routes / as jade/ partial param use..) )
            arr['col_generic_wide']     = [ {  url: 'column?side=wide'} ];
            arr['col_generic_center']   = [ {  url: 'column?side=center'} ];
            arr['col_generic_right']    = [ {  url: 'column?side=right'} ];
            arr['col_generic_left']     = [ {  url: 'column?side=left'} ];
            arr['col_generic_under']    = [ {  url: 'column?side=under'} ];
            arr['col_generic_global']   = [ {  url: 'column?side=global'} ];

            // render modes
            arr['dataset']              = [ {  url: 'fragments/dataset'} ];
            arr['media']                = [ {  url: 'fragments/media'} ];
            arr['card']                 = [ {  url: 'fragments/card'} ];

            // editor
            arr['editleft']             = [{  url: 'editor/edit_side/left'} ];
            arr['editright']             = [{ url: 'editor/edit_side/right'} ];
            arr['section_tool']         = [ {  url: 'editor/section_tool'} ];
            arr['section_tool_lab']     = [ {  url: 'editor/section_tool_lab'} ];
            arr['bottom_editor']        = [ {  url: 'editor/bottom_editor'} ];
            arr['logs']     = [ {  url: 'fragments/logs'} ];

*/


        return arr;
      },
      classesAvailable:function (){
        var arr = [
            //  { id: 1, icon: 'black_ptext' , notice: 'b'},
            //  { id: 2, icon: 'white_ptext', notice: 'w' },
            // { id: 1, icon: 'fx_bolds', notice: 'bolds are reverse', group: 'markup' }, 
            { id: 2, icon: 'black_bg', notice: 'Fond noir / background #000', group: 'bg' }, 
            //  { id: 3, icon: 'silver_bg',  notice: 'Fond silver / background #bdc3c7' , group: 'bg' }, 
            //  { id: 4, icon: 'cloud_bg',  notice: 'Fond cloud / background #ecf0f1' , group: 'bg' }, 
            {id:5, icon :'mapa20_topbtm', notice: 'padding et margin 0 20px', group: 'pd'},
            {id:12, icon :'pa20_topbtm', notice: 'padding 20px haut et bas',group: 'pd'},
            {id:13, icon :'pa40_topbtm', notice: 'padding 40px haut et bas',group: 'pd'},
            {id:12, icon :'pa100_topbtm', notice: 'padding 100px haut et bas',group: 'pd'},
            {id:19, icon :'textright', notice: 'Texte aligné à droite',group: 'pd'},
            { id: 45, icon: 'bigger_fonts',  notice: 'Bigger fonts size' , group: 'fs' }, 
            /*
            {id:14, icon :'rotate_r_45', notice: 'rotate r_45'},
            {id:15, icon :'rotate_l_45', notice: 'rotate l_45'},
            {id:16, icon :'rotate_r_90', notice: 'rotate r_90'},
            {id:17, icon :'rotate_l_90', notice: 'rotate l_90'},
            {id:18, icon :'rotate_180', notice: 'rotate 180'},
            */
            {id:78, icon :'col_splited_2', notice: 'two cols text', group: 'wd'},
            {id:89, icon :'text_wider', notice: 'Texte plus large',group: 'wd'},
            {id:6, icon :'custom_a', notice: 'Custom a'},
            {id:7, icon :'custom_b', notice: 'Custom b'},
            {id:8, icon :'custom_c', notice: 'Custom c'},
            {id:9, icon :'custom_d', notice: 'Custom d'},
            {id:10, icon :'custom_e', notice: 'Custom e'},
            {id:11, icon :'custom_f', notice: 'Custom f'}
          ];
          return arr;
          ///section_text black_bg white_ptext no_bg_repeat big_black_text green_filter has_image has_image_center has_image_right
      },
        def: function (l) {
          //  var defs = new Array('title','slug','kind',/*'content',*/ 'external','section', 'order', 'status',' ishome','staticload','rev','real_published','secret' );
          var defs = new Array('slug','kind', 'external','section', 'order', 'status',' ishome','staticload','rev','real_published');
          return defs;
        }       
      }
         return self;
    }
});
