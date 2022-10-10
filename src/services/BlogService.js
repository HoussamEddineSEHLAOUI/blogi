import { database, uplodToStorageAndGetUrlPublic } from "@/Firebase";
import store from "../store";
import {
  collection,
  onSnapshot,
  query,
  Timestamp,
  addDoc,
  updateDoc,
  getFirestore,
  where,
  getDoc,
  doc as DOC,
} from "firebase/firestore";
import { ref as refVue } from "vue";
const PATH_BLOG_COLLECTION = "Blogs";
async function getViedosListWithPublicurl(files) {
  // Generate public url for videos
  var UpdateVideos = [];
  for await (let file of files) {
    // Genreate public url of the video after stor the video in storge
    const publicVideoUrl = await uplodToStorageAndGetUrlPublic(file.video);
    await UpdateVideos.push({
      videoUrl: publicVideoUrl,
      duration: file?.duration,
      start: file?.start,
      end: file?.end,
      flag: file?.flag,
    });
  }
  return UpdateVideos;
}
export function useBlog() {
  const BlogCollection = collection(database, PATH_BLOG_COLLECTION);
  const Blogs = refVue([]);
  const queryBlog = query(BlogCollection, where("is_deleted", "==", false));
  onSnapshot(queryBlog, (snapshot) => {
    Blogs.value = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        description: data.description,
        videos: data.videos,
        date_created: data.date_created,
        date_updated: data.date_updated,
      };
    });
  });
  // get blog by id no bug
  const getBlogById = async (id) => {
    try {
      const docRef = await DOC(BlogCollection, id);
      const doc = await getDoc(docRef);
      const data = doc.data();
      return data;
    } catch (error) {
      console.log("There was error getting Blog by from cloud", error);
    }
  };
  // get blog by user id :
  const getBlogByUserId = async (userId) => {
    try {
      const MyBlogs = refVue([]);
      const queryBlogByUserId = query(
        BlogCollection,
        where("uid", "==", userId),
        where("is_deleted", "==", false)
      );
      onSnapshot(queryBlogByUserId, (snapshot) => {
        MyBlogs.value = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            uid: data?.uid,
            title: data.title,
            description: data.description,
            videos: data.videos,
            date_created: data.date_created,
            date_updated: data.date_updated,
          };
        });
      });
      return MyBlogs;
    } catch (error) {
      console.log("There was error getting Blog by from cloud", error);
    }
  };
  // function to add new blog : no bug
  const addBlog = async (uid, blog) => {
    console.log(uid);
    try {
      // Gel list of videos with public url
      const UpdateVideos = await getViedosListWithPublicurl(blog.files);
      const uid = await store.getters.get_user_id;
      const data = {
        uid: uid,
        title: blog.title,
        description: blog.description,
        files: UpdateVideos,
        date_created: Timestamp.now(),
        date_updated: Timestamp.now(),
        is_deleted: false,
      };
      // Add data to the database
      await addDoc(collection(getFirestore(), PATH_BLOG_COLLECTION), data);
    } catch (error) {
      console.log("There was error Adding Blog to cloud", error);
    }
  };
  // Update blog function
  const updateBlog = async (id, blog) => {
    try {
      // Get the doc ref
      const docRef = await DOC(BlogCollection, id);
      // Get the new data of the blog
      const data = {
        title: blog.title,
        description: blog.description,
        files: blog.files,
        date_updated: Timestamp.now(),
      };
      // Update the date of the blog in firebase
      await updateDoc(docRef, data);
    } catch (error) {
      console.log("There was error Updating Blog to cloud", error);
    }
  };
  // Update blog function no bug
  const deleteBlog = async (id) => {
    try {
      // Get the doc ref
      const docRef = await DOC(BlogCollection, id);
      // Get the new data of the blog
      const data = {
        is_deleted: true,
      };
      // Update the is deleted of the blog in firebase
      await updateDoc(docRef, data);
    } catch (error) {
      console.log("There was error Deleting Blog to cloud", error);
    }
  };
  return {
    Blogs,
    getBlogByUserId,
    getBlogById,
    addBlog,
    updateBlog,
    deleteBlog,
  };
}
