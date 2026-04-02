/**
 * Ce fichier définit les types TypeScript liés aux stacks technologiques utilisées dans les projets, notamment le type Stack qui décrit la structure d'une stack, avec des propriétés telles que l'id, le label, l'URL de l'icône, la description, les versions disponibles et la catégorie associée.
 * Ces types permettent d'assurer une utilisation cohérente et typée des stacks à travers l'application, facilitant ainsi le développement et la maintenance du code.
 */

export interface Stack {
  id: string;
  label: string;
  iconeUrl?: string;
  description?: string;
  versions: string[];
  category?: string;
}
