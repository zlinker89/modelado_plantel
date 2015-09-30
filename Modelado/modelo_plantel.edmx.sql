
-- --------------------------------------------------
-- Entity Designer DDL Script for SQL Server 2005, 2008, 2012 and Azure
-- --------------------------------------------------
-- Date Created: 09/30/2015 16:04:05
-- Generated from EDMX file: c:\users\tecnoparque 11\documents\visual studio 2013\Projects\modelado_plantel\Modelado\modelo_plantel.edmx
-- --------------------------------------------------

SET QUOTED_IDENTIFIER OFF;
GO
USE [control_asistencia];
GO
IF SCHEMA_ID(N'dbo') IS NULL EXECUTE(N'CREATE SCHEMA [dbo]');
GO

-- --------------------------------------------------
-- Dropping existing FOREIGN KEY constraints
-- --------------------------------------------------


-- --------------------------------------------------
-- Dropping existing tables
-- --------------------------------------------------


-- --------------------------------------------------
-- Creating all tables
-- --------------------------------------------------

-- Creating table 'Usuarios'
CREATE TABLE [dbo].[Usuarios] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [nombreusuario] nvarchar(max)  NOT NULL,
    [fecha_registro] datetime  NOT NULL
);
GO

-- Creating table 'Notificaciones'
CREATE TABLE [dbo].[Notificaciones] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [asunto] nvarchar(max)  NOT NULL,
    [mensaje] nvarchar(max)  NOT NULL,
    [fecha_creacion] datetime  NOT NULL,
    [UsuarioId] int  NOT NULL,
    [EstudianteId] int  NOT NULL
);
GO

-- Creating table 'Jornadas'
CREATE TABLE [dbo].[Jornadas] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [nombre_jornada] nvarchar(max)  NOT NULL
);
GO

-- Creating table 'Cursos'
CREATE TABLE [dbo].[Cursos] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [nombre_curso] nvarchar(max)  NOT NULL
);
GO

-- Creating table 'Asignaturas'
CREATE TABLE [dbo].[Asignaturas] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [nombre_asignatura] nvarchar(max)  NOT NULL
);
GO

-- Creating table 'Matriculas'
CREATE TABLE [dbo].[Matriculas] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [fecha_matricula] nvarchar(max)  NOT NULL,
    [JornadaId] int  NOT NULL,
    [CursoId] int  NOT NULL,
    [ProfesorAsignaturaId] int  NOT NULL,
    [AsistenciaId] int  NOT NULL
);
GO

-- Creating table 'Profesores'
CREATE TABLE [dbo].[Profesores] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [nombres] nvarchar(max)  NOT NULL,
    [apellidos] nvarchar(max)  NOT NULL,
    [rol] nvarchar(max)  NOT NULL,
    [tdocumento] nvarchar(max)  NOT NULL,
    [ndocumento] nvarchar(max)  NOT NULL,
    [telefono] nvarchar(max)  NOT NULL,
    [direccion] nvarchar(max)  NOT NULL,
    [UsuarioId] int  NOT NULL
);
GO

-- Creating table 'Estudiantes'
CREATE TABLE [dbo].[Estudiantes] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [nombres] nvarchar(max)  NOT NULL,
    [apellidos] nvarchar(max)  NOT NULL,
    [tdocumento] nvarchar(max)  NOT NULL,
    [ndocumento] nvarchar(max)  NOT NULL,
    [fecha_nacimiento] nvarchar(max)  NOT NULL,
    [telefono] nvarchar(max)  NOT NULL,
    [direccion] nvarchar(max)  NOT NULL,
    [UsuarioId] int  NOT NULL
);
GO

-- Creating table 'Padres'
CREATE TABLE [dbo].[Padres] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [nombres] nvarchar(max)  NOT NULL,
    [apellidos] nvarchar(max)  NOT NULL,
    [tdocumento] nvarchar(max)  NOT NULL,
    [ndocumento] nvarchar(max)  NOT NULL,
    [telefono] nvarchar(max)  NOT NULL,
    [direccion] nvarchar(max)  NOT NULL,
    [UsuarioId] int  NOT NULL,
    [EstudianteId] int  NOT NULL
);
GO

-- Creating table 'Asistencias'
CREATE TABLE [dbo].[Asistencias] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [estado] bit  NOT NULL,
    [fecha_asistencia] nvarchar(max)  NOT NULL
);
GO

-- Creating table 'Admins'
CREATE TABLE [dbo].[Admins] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [nombres] nvarchar(max)  NOT NULL,
    [apellidos] nvarchar(max)  NOT NULL,
    [rol] nvarchar(max)  NOT NULL,
    [tdocumento] nvarchar(max)  NOT NULL,
    [ndocumento] nvarchar(max)  NOT NULL,
    [telefono] nvarchar(max)  NOT NULL,
    [direccion] nvarchar(max)  NOT NULL,
    [UsuarioId] int  NOT NULL
);
GO

-- Creating table 'ProfesorAsignaturaSet'
CREATE TABLE [dbo].[ProfesorAsignaturaSet] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [ProfesorId] int  NOT NULL,
    [AsignaturaId] int  NOT NULL
);
GO

-- --------------------------------------------------
-- Creating all PRIMARY KEY constraints
-- --------------------------------------------------

-- Creating primary key on [Id] in table 'Usuarios'
ALTER TABLE [dbo].[Usuarios]
ADD CONSTRAINT [PK_Usuarios]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Notificaciones'
ALTER TABLE [dbo].[Notificaciones]
ADD CONSTRAINT [PK_Notificaciones]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Jornadas'
ALTER TABLE [dbo].[Jornadas]
ADD CONSTRAINT [PK_Jornadas]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Cursos'
ALTER TABLE [dbo].[Cursos]
ADD CONSTRAINT [PK_Cursos]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Asignaturas'
ALTER TABLE [dbo].[Asignaturas]
ADD CONSTRAINT [PK_Asignaturas]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Matriculas'
ALTER TABLE [dbo].[Matriculas]
ADD CONSTRAINT [PK_Matriculas]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Profesores'
ALTER TABLE [dbo].[Profesores]
ADD CONSTRAINT [PK_Profesores]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Estudiantes'
ALTER TABLE [dbo].[Estudiantes]
ADD CONSTRAINT [PK_Estudiantes]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Padres'
ALTER TABLE [dbo].[Padres]
ADD CONSTRAINT [PK_Padres]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Asistencias'
ALTER TABLE [dbo].[Asistencias]
ADD CONSTRAINT [PK_Asistencias]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Admins'
ALTER TABLE [dbo].[Admins]
ADD CONSTRAINT [PK_Admins]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'ProfesorAsignaturaSet'
ALTER TABLE [dbo].[ProfesorAsignaturaSet]
ADD CONSTRAINT [PK_ProfesorAsignaturaSet]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- --------------------------------------------------
-- Creating all FOREIGN KEY constraints
-- --------------------------------------------------

-- Creating foreign key on [UsuarioId] in table 'Estudiantes'
ALTER TABLE [dbo].[Estudiantes]
ADD CONSTRAINT [FK_UsuarioEstudiante]
    FOREIGN KEY ([UsuarioId])
    REFERENCES [dbo].[Usuarios]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_UsuarioEstudiante'
CREATE INDEX [IX_FK_UsuarioEstudiante]
ON [dbo].[Estudiantes]
    ([UsuarioId]);
GO

-- Creating foreign key on [UsuarioId] in table 'Profesores'
ALTER TABLE [dbo].[Profesores]
ADD CONSTRAINT [FK_UsuarioProfesor]
    FOREIGN KEY ([UsuarioId])
    REFERENCES [dbo].[Usuarios]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_UsuarioProfesor'
CREATE INDEX [IX_FK_UsuarioProfesor]
ON [dbo].[Profesores]
    ([UsuarioId]);
GO

-- Creating foreign key on [UsuarioId] in table 'Padres'
ALTER TABLE [dbo].[Padres]
ADD CONSTRAINT [FK_UsuarioPadre]
    FOREIGN KEY ([UsuarioId])
    REFERENCES [dbo].[Usuarios]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_UsuarioPadre'
CREATE INDEX [IX_FK_UsuarioPadre]
ON [dbo].[Padres]
    ([UsuarioId]);
GO

-- Creating foreign key on [UsuarioId] in table 'Admins'
ALTER TABLE [dbo].[Admins]
ADD CONSTRAINT [FK_UsuarioAdmin]
    FOREIGN KEY ([UsuarioId])
    REFERENCES [dbo].[Usuarios]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_UsuarioAdmin'
CREATE INDEX [IX_FK_UsuarioAdmin]
ON [dbo].[Admins]
    ([UsuarioId]);
GO

-- Creating foreign key on [UsuarioId] in table 'Notificaciones'
ALTER TABLE [dbo].[Notificaciones]
ADD CONSTRAINT [FK_UsuarioNotificacion]
    FOREIGN KEY ([UsuarioId])
    REFERENCES [dbo].[Usuarios]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_UsuarioNotificacion'
CREATE INDEX [IX_FK_UsuarioNotificacion]
ON [dbo].[Notificaciones]
    ([UsuarioId]);
GO

-- Creating foreign key on [EstudianteId] in table 'Notificaciones'
ALTER TABLE [dbo].[Notificaciones]
ADD CONSTRAINT [FK_EstudianteNotificacion]
    FOREIGN KEY ([EstudianteId])
    REFERENCES [dbo].[Estudiantes]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_EstudianteNotificacion'
CREATE INDEX [IX_FK_EstudianteNotificacion]
ON [dbo].[Notificaciones]
    ([EstudianteId]);
GO

-- Creating foreign key on [EstudianteId] in table 'Padres'
ALTER TABLE [dbo].[Padres]
ADD CONSTRAINT [FK_EstudiantePadre]
    FOREIGN KEY ([EstudianteId])
    REFERENCES [dbo].[Estudiantes]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_EstudiantePadre'
CREATE INDEX [IX_FK_EstudiantePadre]
ON [dbo].[Padres]
    ([EstudianteId]);
GO

-- Creating foreign key on [ProfesorId] in table 'ProfesorAsignaturaSet'
ALTER TABLE [dbo].[ProfesorAsignaturaSet]
ADD CONSTRAINT [FK_ProfesorProfesorAsignatura]
    FOREIGN KEY ([ProfesorId])
    REFERENCES [dbo].[Profesores]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_ProfesorProfesorAsignatura'
CREATE INDEX [IX_FK_ProfesorProfesorAsignatura]
ON [dbo].[ProfesorAsignaturaSet]
    ([ProfesorId]);
GO

-- Creating foreign key on [AsignaturaId] in table 'ProfesorAsignaturaSet'
ALTER TABLE [dbo].[ProfesorAsignaturaSet]
ADD CONSTRAINT [FK_AsignaturaProfesorAsignatura]
    FOREIGN KEY ([AsignaturaId])
    REFERENCES [dbo].[Asignaturas]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_AsignaturaProfesorAsignatura'
CREATE INDEX [IX_FK_AsignaturaProfesorAsignatura]
ON [dbo].[ProfesorAsignaturaSet]
    ([AsignaturaId]);
GO

-- Creating foreign key on [JornadaId] in table 'Matriculas'
ALTER TABLE [dbo].[Matriculas]
ADD CONSTRAINT [FK_JornadaMatricula]
    FOREIGN KEY ([JornadaId])
    REFERENCES [dbo].[Jornadas]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_JornadaMatricula'
CREATE INDEX [IX_FK_JornadaMatricula]
ON [dbo].[Matriculas]
    ([JornadaId]);
GO

-- Creating foreign key on [CursoId] in table 'Matriculas'
ALTER TABLE [dbo].[Matriculas]
ADD CONSTRAINT [FK_CursoMatricula]
    FOREIGN KEY ([CursoId])
    REFERENCES [dbo].[Cursos]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_CursoMatricula'
CREATE INDEX [IX_FK_CursoMatricula]
ON [dbo].[Matriculas]
    ([CursoId]);
GO

-- Creating foreign key on [ProfesorAsignaturaId] in table 'Matriculas'
ALTER TABLE [dbo].[Matriculas]
ADD CONSTRAINT [FK_ProfesorAsignaturaMatricula]
    FOREIGN KEY ([ProfesorAsignaturaId])
    REFERENCES [dbo].[ProfesorAsignaturaSet]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_ProfesorAsignaturaMatricula'
CREATE INDEX [IX_FK_ProfesorAsignaturaMatricula]
ON [dbo].[Matriculas]
    ([ProfesorAsignaturaId]);
GO

-- Creating foreign key on [AsistenciaId] in table 'Matriculas'
ALTER TABLE [dbo].[Matriculas]
ADD CONSTRAINT [FK_AsistenciaMatricula]
    FOREIGN KEY ([AsistenciaId])
    REFERENCES [dbo].[Asistencias]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_AsistenciaMatricula'
CREATE INDEX [IX_FK_AsistenciaMatricula]
ON [dbo].[Matriculas]
    ([AsistenciaId]);
GO

-- --------------------------------------------------
-- Script has ended
-- --------------------------------------------------