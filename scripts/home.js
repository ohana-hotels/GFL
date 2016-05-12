// home.js

fnp.setup = {};
fnp.leagues = {};
fnp.team = {};

fnp.home = {
  start: function(){
    fnp.apiCall({
      url: fnp.searchDataFile('setup.json'),
      cb: function(){
        fnp.setup.content = this;
        fnp.setup.default = JSON.parse( atob(this.content) );
        fnp.setup.sha = this.sha;
        if(fnp.repo.type == 'Organization' && fnp.user.type == 'owner') {
          fnp.appendi({ tag: 'li', parent: fnp.dom.ul, innerHTML: 'setup: <a href="' + fnp.repo.home + '/setup">edit</a>' });
        }else{
          fnp.appendi({ tag: 'li', parent: fnp.dom.ul, innerHTML: 'setup: found' });
        }
        fnp.home.checkLeagues();
      },
      err: function(){
        if(fnp.repo.type == 'Organization' && fnp.user.type == 'owner'){
          fnp.appendi({ tag: 'li', parent: fnp.dom.ul, innerHTML: 'warning: no setup, <a href="' + fnp.repo.home + '/setup/">create</a>' });
        }else{
          fnp.appendi({ tag: 'li', parent: fnp.dom.ul, innerHTML: 'error: no setup' });
        }
      }
    });
  },
  checkLeagues: function(){
    fnp.apiCall({
      url: fnp.searchDataFile('leagues/leagues.json'),
      cb: function(){
        fnp.leagues.content = this;
        fnp.leagues.default = JSON.parse( atob(this.content) );
        if(fnp.repo.type == 'Organization' && fnp.user.type == 'owner'){
          fnp.appendi({ tag: 'li', parent: fnp.dom.ul, innerHTML: 'leagues: <a href="' + fnp.repo.home + '/league/setup">edit</a>' });
        }else{
          fnp.appendi({ tag: 'li', parent: fnp.dom.ul, innerHTML: 'leagues: found' });
          if(fnp.repo.type == 'User' && fnp.user.type == 'owner') fnp.home.checkTeam(); else fnp.home.displayLeagues();
        }
      },
      err: function(){
        if(fnp.repo.type == 'Organization' && fnp.user.type == 'owner'){
          fnp.appendi({ tag: 'li', parent: fnp.dom.ul, innerHTML: 'warning: no leagues, <a href="' + fnp.repo.home + '/league/setup/">create</a>' });
        }else{
          fnp.appendi({ tag: 'li', parent: fnp.dom.ul, innerHTML: 'error: no leagues' });
        }
      }
    });
  },
  checkTeam: function(){
    // User & owner
    fnp.apiCall({
      url: fnp.searchDataFile('teams/' + fnp.repo.owner + '.json'),
      cb: function(){
        fnp.team.content = this;
        fnp.team.default = JSON.parse( atob(this.content) );
        fnp.appendi({ tag: 'li', parent: fnp.dom.ul, innerHTML: 'team: <a href="' + fnp.repo.home + '/team/setup">edit</a>' });
        fnp.home.displayLeagues();
      },
      err: function(){
        fnp.appendi({ tag: 'li', parent: fnp.dom.ul, innerHTML: 'warning: no team, <a href="' + fnp.repo.home + '/team/setup/">create</a>' });
        fnp.home.displayLeagues();
      }
    });
  },
  displayLeagues: function(){
    console.log(fnp.leagues.deafult);
    fnp.apiCall({
      url: fnp.repo.API + '/readme?ref=' + (fnp.repo.master ? fnp.repo.master : 'master'),
      accept: 'application/vnd.github.v3.html+json',
      cb: function(){
        fnp.appendi({ tag: 'p', parent: fnp.dom.section, innerHTML: this });
      }
    });
  }
};

fnp.home.start();
