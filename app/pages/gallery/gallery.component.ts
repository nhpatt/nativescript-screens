import { Component, OnInit } from "@angular/core";
import { ScreensContext } from "../../shared/context/screens-context.service";
import app = require("application");

declare var com: any;

@Component({
    selector: "gallery",
    providers: [ScreensContext],
    template: ``,
    styleUrls: ["pages/gallery/gallery-common.css"]
})
export class ImageGalleryComponent implements OnInit {

    constructor(private screensContext: ScreensContext) {
    }

    ngOnInit() {
        console.log('trying to render gallery');

        let context = app.android.context;

        let gallery = new com.liferay.mobile.screens.imagegallery.ImageGalleryScreenlet(context);

        gallery.setRepositoryId(this.screensContext.GROUP_ID);
        gallery.setFolderId(this.screensContext.IMAGE_GALLERY_FOLDER_ID);
        gallery.setAutoLoad(true);
        gallery.setGroupId(this.screensContext.GROUP_ID);
        gallery.setFirstPageSize(10);
        gallery.setPageSize(10);
        let remoteOnly = com.liferay.mobile.screens.cache.CachePolicy.REMOTE_ONLY;
        gallery.setCachePolicy(remoteOnly);
        let picasso = com.liferay.mobile.screens.context.PicassoScreens;
        picasso.setCachePolicy(remoteOnly);
        let localeUS = java.util.Locale.US;
        gallery.setLocale(localeUS);
        let layout = context.getResources().getIdentifier("gallery_custom", "layout", context.getPackageName());

        gallery.render(layout);

        console.log(gallery);

        let containerId = context.getResources().getIdentifier("content" , "id", "android");
        let activity = app.android.foregroundActivity;
        let container = activity.findViewById(containerId);
        let matchParent = android.widget.LinearLayout.LayoutParams.MATCH_PARENT;
        container.addView(gallery, matchParent, matchParent);
    }
}