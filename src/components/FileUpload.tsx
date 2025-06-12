
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Upload, File, Image, X, Download } from 'lucide-react';

interface FileItem {
  id: string;
  name: string;
  type: 'document' | 'photo';
  size: string;
  uploadDate: string;
}

interface FileUploadProps {
  title: string;
  userType: 'admin' | 'doctor' | 'caregiver' | 'patient';
}

export const FileUpload = ({ title, userType }: FileUploadProps) => {
  const [files, setFiles] = useState<FileItem[]>([
    {
      id: '1',
      name: 'Receita_Médica.pdf',
      type: 'document',
      size: '2.3 MB',
      uploadDate: '2024-01-10'
    },
    {
      id: '2',
      name: 'Exame_Sangue.jpg',
      type: 'photo',
      size: '1.8 MB',
      uploadDate: '2024-01-09'
    }
  ]);

  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploadError(null);
      const uploadedFiles = event.target.files;
      
      if (uploadedFiles) {
        Array.from(uploadedFiles).forEach((file) => {
          // Validar tamanho do arquivo (máximo 10MB)
          if (file.size > 10 * 1024 * 1024) {
            setUploadError(`Arquivo ${file.name} é muito grande (máximo 10MB)`);
            return;
          }

          // Validar tipo de arquivo
          const allowedTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'image/jpeg',
            'image/png',
            'image/gif'
          ];

          if (!allowedTypes.includes(file.type)) {
            setUploadError(`Tipo de arquivo não suportado: ${file.name}`);
            return;
          }

          const newFile: FileItem = {
            id: Date.now().toString() + Math.random().toString(),
            name: file.name,
            type: file.type.startsWith('image/') ? 'photo' : 'document',
            size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
            uploadDate: new Date().toISOString().split('T')[0]
          };
          
          setFiles(prev => [...prev, newFile]);
        });
      }
    } catch (error) {
      console.error('Erro no upload:', error);
      setUploadError('Erro ao fazer upload do arquivo');
    }
  };

  const removeFile = (id: string) => {
    try {
      setFiles(files.filter(file => file.id !== id));
    } catch (error) {
      console.error('Erro ao remover arquivo:', error);
    }
  };

  const getFileIcon = (type: 'document' | 'photo') => {
    return type === 'photo' ? Image : File;
  };

  const getTypeBadge = (type: 'document' | 'photo') => {
    return type === 'photo' 
      ? <Badge className="bg-blue-100 text-blue-700">Foto</Badge>
      : <Badge className="bg-green-100 text-green-700">Documento</Badge>;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {uploadError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-red-700 text-sm">{uploadError}</p>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setUploadError(null)}
              className="mt-2"
            >
              Fechar
            </Button>
          </div>
        )}

        <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
          <Input
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif"
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <Upload className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600 mb-2">Clique para fazer upload ou arraste arquivos aqui</p>
            <p className="text-xs text-slate-400">PDF, DOC, DOCX, JPG, PNG (até 10MB)</p>
          </label>
        </div>

        {files.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium text-slate-700">Arquivos Enviados</h4>
            {files.map((file) => {
              const FileIcon = getFileIcon(file.type);
              return (
                <div key={file.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileIcon className="h-8 w-8 text-slate-500" />
                    <div>
                      <p className="font-medium text-sm">{file.name}</p>
                      <p className="text-xs text-slate-500">{file.size} • {new Date(file.uploadDate).toLocaleDateString('pt-BR')}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getTypeBadge(file.type)}
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => removeFile(file.id)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
