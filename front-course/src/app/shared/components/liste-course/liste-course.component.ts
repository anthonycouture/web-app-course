import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ItemCourseDetails, ListeCourseDetails} from "../../utils/course-utils";

@Component({
  selector: 'app-liste-course',
  templateUrl: './liste-course.component.html',
  styleUrls: ['./liste-course.component.css']
})
export class ListeCourseComponent implements OnInit {

  @Input() listeCourseDetails: ListeCourseDetails[];

  @Output() addQuantityItemCourse = new EventEmitter<ItemCourseDetails>();

  @Output() lessQuantityItemCourse = new EventEmitter<ItemCourseDetails>();

  @Output() deleteItemCourse = new EventEmitter<number>();

  constructor() {
    this.listeCourseDetails = [];
  }

  ngOnInit(): void {
  }

}
