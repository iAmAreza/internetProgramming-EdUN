import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Prisma } from "@prisma/client";
import { CreateCourseDto } from "./dto/create_course.dto";
import { GetCourseDto } from "./dto/get_course.dto";
import { ConfigService } from "@nestjs/config";
import { type } from "os";

@Injectable()
export class CourseService {
  constructor(
    private prismaService: PrismaService,
    private configService: ConfigService,
  ) { }
  // async get_course(getCourseDto: GetCourseDto) {
  //   try {
  //     const course_data = await this.prismaService.course.findFirstOrThrow({
  //       where: {
  //         id: getCourseDto.course_id,
  //       },
  //       include: {
  //         lessons: true,
  //       },
  //     });
  //     return;
  //   } catch (error) {
  //     if (error instanceof Prisma.PrismaClientKnownRequestError) {
  //     }
  //     Logger.error(error);
  //     throw new HttpException(
  //       { message: "Internal Server Error." },
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  // }
  async get_course(course_id: string) {
    try {
      let url = "https://www.youtube.com/playlist?list=PLHiZ4m8vCp9OkrURufHpGUUTBjJhO9Ghy"
      if (course_id) {
        url = `https://www.youtube.com/playlist?list=${course_id}`
      }
      let course_data = await this.get_playlist_info(url);

      console.log(course_data === -1);
      if (course_data === -1) {
        url = "https://www.youtube.com/playlist?list=PLHiZ4m8vCp9OkrURufHpGUUTBjJhO9Ghy";
        course_data = await this.get_playlist_info(url);
      }
      return course_data;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
      }
      Logger.error(error);
      throw new HttpException(
        { message: "Internal Server Error." },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async get_all_courses() {
    try {
      const course_data = await this.prismaService.course.findMany({
        where: {
          is_active: true,
        },
        include: {
          lessons: true,
        },
      });
      return course_data;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
      }
      Logger.error(error);
      throw new HttpException(
        { message: "Internal Server Error." },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async createCourse(courseDto: CreateCourseDto) {
    try {
      const { name, description } = courseDto;
      const course_data = await this.prismaService.course.create({
        data: {
          name: name,
          description: description,
          youtube_course_url: courseDto.youtube_playlist_url,
          owner: {
            connect: {
              id: 1,
            },
          },
        },
      });
      return this.get_playlist_info(courseDto.youtube_playlist_url);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
      }
      Logger.error(error);
      throw new HttpException(
        { message: "Internal Server Error." },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async get_playlists_all_videos_url(youtube_playlist_url: string) {
    let video_ids: String[] = [];
    const api_key = this.configService.get("youtube_api_key");
    // verify if the url is a valid youtube playlist url
    const playlist_id = youtube_playlist_url.split("list=")[1];
    try {
      let count = 0;
      let next_page_token = "";
      while (true) {
        if (count > 1000) {
          break;
        }
        let url = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=25&playlistId=${playlist_id}&key=${api_key}`;
        // console.log(url);
        if (next_page_token !== "") {
          url = url + `&pageToken=${next_page_token}`;
        }
        const res = await fetch(url);
        const data = await res.json();
        let single_page_video_ids: String[] = [];
        for (let i = 0; i < data["items"].length; i++) {
          single_page_video_ids.push(
            "https://www.youtube.com/watch?v=" +
            data["items"][i]["contentDetails"]["videoId"],
          );
        }
        video_ids.push(...single_page_video_ids);
        if (!data["nextPageToken"]) {
          break;
        }
        next_page_token = data["nextPageToken"];
        // console.log(data);
        count++;
      }
      return video_ids;
    } catch (err) {
      Logger.error(err);
    }
  }

  async get_playlist_info(youtube_playlist_url: string) {
    let video_ids: youtube_playlist_data[] = [];
    const api_key = this.configService.get("youtube_api_key");
    // verify if the url is a valid youtube playlist url
    const playlist_id = youtube_playlist_url.split("list=")[1];
    let res_data: youtube_playlist_data;
    this.get_playlist_name_desc(youtube_playlist_url);
    try {
      let count = 0;
      let next_page_token = "";
      while (true) {
        if (count > 30) {
          break;
        }
        let url = `https://youtube.googleapis.com/youtube/v3/playlistItems?playlistId=${playlist_id}&maxResults=25&key=${api_key}&part=snippet&fields=*`;
        if (next_page_token !== "") {
          url = url + `&pageToken=${next_page_token}`;
        }
        const res = await fetch(url);
        const data: youtube_playlist_data = await res.json();

        if (data['error']) {
          throw data;
          return;
        }
        if (count === 0) {
          res_data = data;
          const title_desc = await this.get_playlist_name_desc(youtube_playlist_url);
          res_data.playlist_title = title_desc['title'];
          res_data.playlist_description = title_desc['description'];
        } else {
          res_data.items.push(...data.items);
        }
        // console.log(data.nextPageToken)
        if (data.nextPageToken === "" || data.nextPageToken === null || data.nextPageToken === undefined) {
          break;
        }
        next_page_token = data.nextPageToken;
        count++;
      }


      // console.log(data);
      return res_data;
    } catch (err) {
      return -1;
    }
  }
  async get_playlist_name_desc(youtube_playlist_url: string) {
    const api_key = this.configService.get("youtube_api_key");
    const playlist_id = youtube_playlist_url.split("list=")[1];

    try {

      let url = `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&id=${playlist_id}&key=${api_key}&part=snippet&fields=*`;

      const res = await fetch(url);

      const data = await res.json();
      return {
        title: data['items'][0]['snippet']['title'],
        description: data['items'][0]['snippet']['description']
      };
    } catch (err) {
      return -1;
    }
  }
  async updateCourse() { }
}
type youtube_playlist_data = {
  playlist_title: string;
  playlist_description: string;
  kind: string;
  etag: string;
  nextPageToken: string;
  items: [
    {
      kind: string;
      etag: string;
      id: string;
      snippet: {
        publishedAt: string;
        channelId: string;
        title: string;
        description: string;
        thumbnails: {
          [key: string]: {
            url: string;
            width: number;
            height: number;
          };
        };
        channelTitle: string;
        videoOwnerChannelTitle: string;
        videoOwnerChannelId: string;
        playlistId: string;
        position: number;
        resourceId: {
          kind: string;
          videoId: string;
        };
        // contentDetails: {
        //     videoId: string
        //     startAt: string
        //     endAt: string
        //     note: string
        //     videoPublishedAt: string
        // }
        // status: {
        //     privacyStatus: string
        // }
      };
    },
  ];
};
