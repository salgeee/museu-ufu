import { Pipe, PipeTransform } from '@angular/core';
import { AcademicInformation } from '@features/graduates/academic-information/models/academic-information.model';
import { getInitials } from '@shared/utils/string.utils';

@Pipe({
	name: 'titleCollapseAcademicInformation',
	standalone: true,
})
export class TitleCollapseAcademicInformationPipe implements PipeTransform {
	transform(academicInformation: Partial<AcademicInformation>): string {
		if (!academicInformation.courseName && !academicInformation.institutionName) {
			return '';
		}

		return (academicInformation?.courseName || '') + ' - ' + getInitials(academicInformation?.institutionName || '');
	}
}
