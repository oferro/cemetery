package com.oferr.cemetery;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import org.junit.jupiter.api.Test;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

class ArchTest {

    @Test
    void servicesAndRepositoriesShouldNotDependOnWebLayer() {

        JavaClasses importedClasses = new ClassFileImporter()
            .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
            .importPackages("com.oferr.cemetery");

        noClasses()
            .that()
                .resideInAnyPackage("com.oferr.cemetery.service..")
            .or()
                .resideInAnyPackage("com.oferr.cemetery.repository..")
            .should().dependOnClassesThat()
                .resideInAnyPackage("..com.oferr.cemetery.web..")
        .because("Services and repositories should not depend on web layer")
        .check(importedClasses);
    }
}
