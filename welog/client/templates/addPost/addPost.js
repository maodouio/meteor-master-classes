Template.addPost.helpers({
  sections: function() {
    return Session.get('sections');
  }
});


Template.addPost.events({
  'click a.ion-android-textsms': function(e) {
    var sections;
    sections = (Session.get('sections')) || [];
    sections.push({
      type: 'text',
      time: Date.now()
    });
    return Session.set('sections', sections);
  },
  'click a.ion-android-camera': function(e) {
    return MeteoricCamera.getPicture({}, function(e, r) {
      var sections;
      if (e != null) {
        return console.log(e.message);
      } else {
        sections = (Session.get('sections')) || [];
        sections.push({
          type: 'picture',
          time: Date.now(),
          pic: r
        });
        return Session.set('sections', sections);
      }
    });
  },
  'click a.ion-android-image': function(e) {
    return console.log("add text now");
  },
  'click a.right-x-button': function(e) {
    var newSections, sections, time;
    time = e.target.getAttribute('data-id');
    sections = Session.get('sections');
    newSections = sections.filter(function(s) {
      return s.time !== parseInt(time);
    });
    return Session.set('sections', newSections);
  },
  'click textarea.in-display-mode': function(e) {
    var sections, timeId, timeString;
    timeString = e.target.getAttribute('data-id');
    timeId = parseInt(timeString);
    sections = Session.get('sections');
    sections.forEach(function(s) {
      if (s.time === timeId) {
        return s.isNotEditMode = false;
      }
    });
    return Session.set('sections', sections);
  },
  'blur textarea.in-edit-mode': function(e) {
    var sections, text, timeId, timeString;
    text = e.target.value;
    timeString = e.target.getAttribute('data-id');
    timeId = parseInt(timeString);
    sections = Session.get('sections');
    sections.forEach(function(s) {
      if (s.time === timeId) {
        s.text = text;
        return s.isNotEditMode = true;
      }
    });
    return Session.set('sections', sections);
  },
  'click a.ion-android-send': function(e, t) {
    var cleanedSections, newPost, postId, ref, sections, title;
    console.log('Submitting...');
    sections = Session.get('sections');
    console.log(sections);
    title = (ref = t.find('input[name=title]')) != null ? ref.value : void 0;
    cleanedSections = sections.map(function(s) {
      delete s.isNotEditMode;
      return s;
    });
    newPost = {
      title: title,
      sections: cleanedSections,
      published: true
    };
    console.log(newPost);
    postId = Posts.insert(newPost);
    return Router.go("/postView/" + postId);
  }
});
