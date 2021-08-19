import {Pipe, PipeTransform} from '@angular/core';
import {itemCourseTabToListeCourseDetailsTab, ListeCourseDetails} from "../../shared/utils/course-utils";
import {ItemCourse} from "../../core/models/item-course";
import {Categorie} from "../../core/models/categorie";

@Pipe({
  name: 'transformDataListePredefined'
})
export class TransformDataListePredefinedPipe implements PipeTransform {

  transform(value: ItemCourse[], details: Categorie[]): ListeCourseDetails[] {
    return itemCourseTabToListeCourseDetailsTab(value, details);
  }

}
